// Pin.mergeOptions changes the defaults of the subclass only, never Marker's
import { LayerGroup, LeafletMap, Marker, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left column: Marker. Right column: Pin. Merge a new opacity, then add pins: earlier ones keep what they were created with.' });
  const log = stage.log('mergeOptions');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 12], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // A subclass, so the merge lands on Pin's own defaultOptions object.
  class Pin extends Marker {}
  Pin.mergeOptions({ opacity: 0.45, title: 'a Pin', riseOnHover: true });

  const report = (): string =>
    `Marker.defaultOptions.opacity = ${Marker.defaultOptions?.['opacity']}   Pin.defaultOptions.opacity = ${Pin.defaultOptions?.['opacity']}   own default object: ${Object.hasOwn(Pin, 'defaultOptions')}`;

  const group = new LayerGroup().addTo(map);
  let row = 0;
  const reset = (): void => {
    group.clearLayers();
    row = 0;
    Pin.mergeOptions({ opacity: 0.45 });
  };
  const addPair = (): void => {
    const lat = 54 - row * 4;
    row++;
    const a: LatLngExpression = [lat, 2];
    const b: LatLngExpression = [lat, 22];
    new Marker(a).addTo(group);
    const pin = new Pin(b).addTo(group);
    log(`Pin ${row}: opacity ${pin.options.opacity}, title "${pin.options.title}"`);
    stage.say(report());
  };
  addPair();
  stage.button('Add a Marker and a Pin', () => (row < 4 ? addPair() : undefined));
  stage.button('Pin.mergeOptions({opacity: 1})', () => {
    Pin.mergeOptions({ opacity: 1 });
    log('merged opacity 1 into Pin');
    stage.say(report());
  });

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (reset(), addPair()) },
        { run: () => addPair() },
        { run: () => (Pin.mergeOptions({ opacity: 1 }), addPair()) },
        { run: () => (Pin.mergeOptions({ opacity: 0.2 }), addPair()) },
        { run: () => undefined, hold: 1800 },
      ],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
