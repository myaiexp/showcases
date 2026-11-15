// Class.include: a mixin added to two subclasses, then one method overridden on one of them
import { CircleMarker, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface Described {
  options: { label: string };
  describe?: () => string;
  getLatLng(): { lat: number; lng: number };
}

const mixin = {
  // `options` in a mixin is merged into the defaults, like mergeOptions
  options: { label: 'unnamed' },
  describe(this: Described): string {
    const { lat, lng } = this.getLatLng();
    return `${this.options.label} at ${lat.toFixed(1)}, ${lng.toFixed(1)}`;
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Step through the buttons. The two layers existed before the first include, and still gain the methods. "Start over" makes fresh classes.' });
  const log = stage.log('include');
  const map = stage.own(new LeafletMap(stage.box, { center: [44, 7], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Fresh subclasses on every start, so the mixin can be included again from scratch.
  class Pin extends Marker {}
  class Disc extends CircleMarker {}
  let Cur = { Pin, Disc };
  let layers: (Marker | CircleMarker)[] = [];

  const refresh = (): void => {
    for (const layer of layers) {
      const text = (layer as unknown as Described).describe?.() ?? 'no describe() yet';
      if (layer.getTooltip()) layer.setTooltipContent(text);
      else layer.bindTooltip(text, { permanent: true, direction: layer instanceof Marker ? 'top' : 'bottom', offset: layer instanceof Marker ? [0, -8] : [0, 8] });
    }
  };
  const start = (): void => {
    for (const layer of layers) layer.remove();
    class FreshPin extends Marker {}
    class FreshDisc extends CircleMarker {}
    Cur = { Pin: FreshPin as typeof Pin, Disc: FreshDisc as typeof Disc };
    // The options object accepts any keys; the typing only knows the class's own.
    layers = [new Cur.Pin([46, 2], { label: 'Paris' } as never).addTo(map), new Cur.Disc([41.9, 12.5], { label: 'Rome', radius: 14 } as never).addTo(map)];
    refresh();
    log('new subclasses, nothing included yet');
    stage.say('Before include: no describe() on either layer');
  };
  const step1 = (): void => {
    Cur.Pin.include(mixin);
    Cur.Disc.include(mixin);
    refresh();
    log(`include(mixin) on Pin and Disc. Marker.prototype has describe: ${'describe' in Marker.prototype}`);
    stage.say(`Pin.include(mixin), Disc.include(mixin): both describe themselves; Marker has describe: ${'describe' in Marker.prototype}`);
  };
  const step2 = (): void => {
    Cur.Pin.include({
      describe(this: Described): string {
        return `PIN ${this.options.label.toUpperCase()}`;
      },
    });
    refresh();
    log('Pin.include({describe}) replaced the method on Pin only');
    stage.say('A second include on Pin overrides describe(); Disc keeps the mixin version');
  };
  start();
  stage.button('1. include the mixin in both', step1);
  stage.button('2. override describe() on Pin', step2);
  stage.button('Start over', start);

  if (stage.preview) stage.cycle([{ run: start }, { run: step1 }, { run: step2 }], 2300);
  return () => stage.dispose();
};

export default mount;
