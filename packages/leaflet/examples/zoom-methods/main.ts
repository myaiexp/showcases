// The ways to set the zoom: setZoom, setView, flyTo, zoomIn, zoomOut, setZoomAround and fitBounds
import { LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls one of the zoom methods from the Zoom Levels tutorial.' });

  const map = stage.own(new LeafletMap(stage.box).setView([48, 10], 4));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const italy = new Rectangle([[36.6, 6.6], [47.1, 18.5]], { color: '#f90', fill: false }).addTo(map);

  const actions: { label: string; run: () => void }[] = [
    { label: 'setZoom(6)', run: () => map.setZoom(6) },
    { label: 'setView([48, 10], 4)', run: () => map.setView([48, 10], 4) },
    { label: 'flyTo([35.7, 139.7], 6)', run: () => map.flyTo([35.7, 139.7], 6) },
    { label: 'zoomIn()', run: () => map.zoomIn() },
    { label: 'zoomOut(2)', run: () => map.zoomOut(2) },
    { label: 'setZoomAround(point, 7)', run: () => map.setZoomAround(map.getSize().multiplyBy(0.8), 7) },
    { label: 'fitBounds(italy)', run: () => map.fitBounds(italy.getBounds()) },
  ];
  let last = '';
  const run = (a: { label: string; run: () => void }): void => {
    last = a.label;
    a.run();
  };
  for (const a of actions) stage.button(a.label, () => run(a));
  map.on('zoomend', () => stage.say(`${last}: zoom ${map.getZoom()}`));

  if (stage.preview) {
    const order = [4, 0, 3, 5, 6, 1];
    stage.cycle(order.map((i) => ({ say: actions[i]!.label, run: () => run(actions[i]!) })), 2600);
  }
  return () => stage.dispose();
};

export default mount;
