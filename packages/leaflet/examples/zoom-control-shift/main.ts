// A shift-click on a zoom button moves three zoomDelta steps instead of one
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a zoom button, then hold Shift and click it again. The step is zoomDelta, times three with Shift.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 20], zoom: 3, minZoom: 0, maxZoom: 10, zoomDelta: 1 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  stage.say(`zoom ${map.getZoom()}, zoomDelta ${map.options.zoomDelta}`);
  if (!stage.preview) map.on('zoomend', () => stage.say(`zoom ${map.getZoom()}, zoomDelta ${map.options.zoomDelta}`));

  stage.slider('zoomDelta', 0.5, 2, 0.5, 1, (v) => {
    map.options.zoomDelta = v;
    map.options.zoomSnap = Math.min(v, 0.5);
    stage.say(`zoomDelta ${v}: a click moves ${v} levels, a shift-click ${v * 3}`);
  });

  if (stage.preview) {
    const button = (cls: string, shiftKey: boolean): void => {
      map.getContainer().querySelector(cls)?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey }));
    };
    stage.cycle([
      { say: 'click: zoom in one level', run: () => button('.leaflet-control-zoom-in', false) },
      { say: 'shift-click: zoom in three levels', run: () => button('.leaflet-control-zoom-in', true) },
      { say: 'shift-click out: three levels back', run: () => button('.leaflet-control-zoom-out', true) },
      { say: 'click out: one level', run: () => button('.leaflet-control-zoom-out', false) },
    ], 1800);
  }
  return () => stage.dispose();
};

export default mount;
