// ZoomControl disable() and enable(), and the buttons that grey out at minZoom and maxZoom
import { LeafletMap, ZoomControl } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'disable() greys both buttons and ignores clicks; the wheel and keyboard still zoom. At minZoom or maxZoom the matching button greys itself.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 14], zoom: 4, minZoom: 2, maxZoom: 6, zoomControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const zoom = new ZoomControl().addTo(map);
  stage.onDispose(() => zoom.remove());

  const state = (note: string): void => {
    const c = zoom.getContainer();
    const off = (cls: string): string => (c?.querySelector(cls)?.classList.contains('leaflet-disabled') ? 'grey' : 'active');
    stage.say(`${note}: zoom ${map.getZoom()} of ${map.getMinZoom()}–${map.getMaxZoom()}; in ${off('.leaflet-control-zoom-in')}, out ${off('.leaflet-control-zoom-out')}`);
  };
  map.on('zoomend', () => state('zoomend'));
  state('start');

  stage.button('disable()', () => { zoom.disable(); state('disable()'); });
  stage.button('enable()', () => { zoom.enable(); state('enable()'); });
  stage.button('setZoom(minZoom)', () => map.setZoom(map.getMinZoom()));
  stage.button('setZoom(maxZoom)', () => map.setZoom(map.getMaxZoom()));

  if (stage.preview) {
    const press = (cls: string): void => c().querySelector<HTMLElement>(cls)?.click();
    const c = (): HTMLElement => zoom.getContainer() as HTMLElement;
    stage.cycle([
      { run: () => press('.leaflet-control-zoom-in') },
      { run: () => press('.leaflet-control-zoom-in') },
      { say: 'maxZoom reached: the in button is grey', run: () => state('') },
      { run: () => zoom.disable() },
      { run: () => { press('.leaflet-control-zoom-out'); state('disabled, out ignored'); } },
      { run: () => { zoom.enable(); map.setZoom(map.getMinZoom()); } },
    ], 1600);
  }
  return () => stage.dispose();
};

export default mount;
