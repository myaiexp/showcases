// getCenter, getZoom, getBounds, getSize, getPixelBounds and getPixelOrigin, live
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag and zoom the map. The readout updates on every move; the pixel origin changes only when the view resets.' });
  const pre = stage.side('Map state');

  const map = stage.own(new LeafletMap(stage.box).setView([46.2, 6.15], 6));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const f = (n: number, d = 3): string => n.toFixed(d);
  const render = (): void => {
    const c = map.getCenter();
    const b = map.getBounds();
    if (!pre) {
      stage.say(`center ${f(c.lat, 2)}, ${f(c.lng, 2)}   zoom ${f(map.getZoom(), 2)}   size ${map.getSize().toString()}`);
      return;
    }
    const pb = map.getPixelBounds();
    pre.textContent = [
      `getCenter()\n  ${f(c.lat)}, ${f(c.lng)}`,
      `getZoom()\n  ${f(map.getZoom(), 2)}`,
      `getBounds()\n  SW ${f(b.getSouth(), 2)}, ${f(b.getWest(), 2)}\n  NE ${f(b.getNorth(), 2)}, ${f(b.getEast(), 2)}`,
      `getSize()\n  ${map.getSize().toString()}`,
      `getPixelBounds()\n  min ${pb.min?.toString()}\n  max ${pb.max?.toString()}`,
      `getPixelOrigin()\n  ${map.getPixelOrigin().toString()}`,
    ].join('\n');
  };
  map.on('move', render);
  map.on('zoom', render);
  map.on('viewreset', render);
  map.on('resize', render);
  render();

  stage.button('Zoom in', () => map.zoomIn());
  stage.button('Zoom out', () => map.zoomOut());
  stage.button('Pan east', () => map.panBy([200, 0]));

  if (stage.preview) {
    const spots: [number, number, number][] = [[46.2, 6.15, 6], [52.5, 13.4, 5], [41.9, 12.5, 7], [40.4, -3.7, 4]];
    let i = 0;
    stage.every(2600, () => {
      i = (i + 1) % spots.length;
      const s = spots[i]!;
      map.flyTo([s[0], s[1]], s[2], { duration: 1.6 });
    });
  }
  return () => stage.dispose();
};

export default mount;
