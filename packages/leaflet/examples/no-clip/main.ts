// noClip draws every vertex; by default a line is cut at the visible area
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const zigzag = (): [number, number][] => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 40; i++) pts.push([34 + (i % 2) * 18, -60 + i * 5]);
  return pts;
};

const drawn = (line: Polyline): number => (line.getElement()?.getAttribute('d')?.match(/[ML]/g) ?? []).length;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both zigzags have 40 vertices and run far past the view. Pan the map: the blue line keeps only the vertices near the view, the orange one all 40.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const clipped = new Polyline(zigzag(), { color: '#7cb7ff', weight: 3 }).addTo(map);
  const whole = new Polyline(zigzag().map(([lat, lng]): [number, number] => [lat - 8, lng]), { color: '#f59e0b', weight: 3, noClip: true }).addTo(map);

  const report = (): void => {
    stage.say(`points drawn: clipped ${drawn(clipped)}, noClip ${drawn(whole)} of 40`);
  };
  map.on('moveend', report);
  report();

  if (stage.preview) {
    stage.cycle([
      { run: () => map.panBy([-200, 0]) },
      { run: () => map.panBy([400, 0]) },
      { run: () => map.panBy([-200, 0]) },
    ], 1500);
  }
  return () => stage.dispose();
};

export default mount;
