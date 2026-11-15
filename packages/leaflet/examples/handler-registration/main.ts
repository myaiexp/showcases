// addHandler, Handler.addTo, and an init hook on an own map subclass with a same-named option
import { CircleMarker, DomEvent, Handler, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

class ProbeHandler extends Handler {
  _ring?: CircleMarker;
  override addHooks(): void {
    DomEvent.on(this._map.getContainer(), 'pointermove', this._move, this);
  }
  override removeHooks(): void {
    DomEvent.off(this._map.getContainer(), 'pointermove', this._move, this);
    this._ring?.remove();
    this._ring = undefined;
  }
  _move(e: Event): void {
    const at = this._map.pointerEventToLatLng(e as PointerEvent);
    this._ring ??= new CircleMarker(at, { radius: 16, color: '#f58a3d', fill: false, interactive: false }).addTo(this._map);
    this._ring.setLatLng(at);
  }
}

type Mode = 'addHandler' | 'addTo' | 'init hook + option';
type ProbeMap = LeafletMap & { probe: ProbeHandler };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick how the handler is attached. Move the pointer over the map; where the handler starts disabled, press "map.probe.enable()".' });
  const log = stage.log('Handler');
  let map: ProbeMap | undefined;
  let g: ReturnType<typeof ghost> | undefined;
  stage.own({ remove: () => (g?.remove(), map?.remove()) });

  // The hook goes on a subclass: LeafletMap.addInitHook would add a probe to every map on the page.
  class HookedMap extends LeafletMap {}
  HookedMap.addInitHook('addHandler', 'probe', ProbeHandler);

  const build = (mode: Mode): ProbeMap => {
    g?.remove();
    map?.remove();
    const options = { center: [45, 10] as [number, number], zoom: 4, zoomControl: false };
    let made: ProbeMap;
    if (mode === 'init hook + option') {
      // `probe: true` is the handler's name used as a map option: the handler is enabled at creation.
      made = new HookedMap(stage.box, { ...options, probe: true } as never) as ProbeMap;
    } else {
      made = new LeafletMap(stage.box, options) as ProbeMap;
      if (mode === 'addHandler') made.addHandler('probe', ProbeHandler);
      else ProbeHandler.addTo(made, 'probe');
    }
    new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(made);
    map = made;
    g = ghost(made);
    log(`${mode}: typeof map.probe = ${typeof made.probe}, map.probe.enabled() = ${made.probe.enabled()}`);
    stage.say(`${mode}: map.probe.enabled() = ${made.probe.enabled()}`);
    return made;
  };
  const sweep = (): void => {
    g?.move([48, 0]);
    stage.after(700, () => g?.move([44, 14]));
  };

  build('addHandler');
  stage.select<Mode>('Attach with', [{ value: 'addHandler', label: 'map.addHandler()' }, { value: 'addTo', label: 'Handler.addTo(map)' }, { value: 'init hook + option', label: 'addInitHook on a subclass' }], 'addHandler', (m) => {
    build(m);
  });
  stage.button('map.probe.enable()', () => {
    map?.probe.enable();
    log(`enabled() = ${map?.probe.enabled()}`);
  });
  stage.button('map.probe.disable()', () => {
    map?.probe.disable();
    log(`enabled() = ${map?.probe.enabled()}`);
  });

  if (stage.preview) {
    const modes: Mode[] = ['addHandler', 'addTo', 'init hook + option'];
    let i = 0;
    stage.cycle(
      [
        { run: () => (build(modes[i++ % modes.length] as Mode), sweep()), hold: 1500 },
        {
          run: () => {
            if (!map?.probe.enabled()) {
              map?.probe.enable();
              stage.say('map.probe.enable(): now the ring follows');
            } else stage.say('enabled at creation by the probe: true option');
            sweep();
          },
          hold: 1800,
        },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
