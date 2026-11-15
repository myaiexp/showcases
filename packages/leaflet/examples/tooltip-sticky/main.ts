// Tooltip sticky: a tooltip that follows the pointer over a shape instead of sitting at its centre
import { LeafletMap, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over each polygon. The left tooltip follows it (sticky: true); the right one stays at the centre.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const box = (lat: number, lng: number, color: string): Polygon =>
    new Polygon(
      [
        [lat + 0.35, lng - 0.9],
        [lat + 0.35, lng + 0.9],
        [lat - 0.35, lng + 0.9],
        [lat - 0.35, lng - 0.9],
      ],
      { color },
    ).addTo(map);
  const left = box(60.1, 23.4, '#34d399').bindTooltip('sticky: true', { sticky: true });
  const right = box(60.1, 26.4, '#f59e0b').bindTooltip('sticky: false');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    // The pointer enters near one corner, then moves across the shape.
    const sweep = (poly: Polygon, lat: number, lng: number): { run: () => void; hold: number }[] =>
      [
        [lat + 0.2, lng - 0.6],
        [lat - 0.05, lng - 0.1],
        [lat - 0.2, lng + 0.5],
      ].map(([la, ln], i) => ({
        run: () => (i === 0 ? g.over([la!, ln!], poly.getElement()) : g.move([la!, ln!], poly.getElement())),
        hold: 800,
      }));
    stage.cycle([
      ...sweep(left, 60.1, 23.4),
      { run: () => g.out(left.getElement()), hold: 300 },
      ...sweep(right, 60.1, 26.4),
      { run: () => g.out(right.getElement()), hold: 300 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
