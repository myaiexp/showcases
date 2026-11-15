// Tooltips on a polyline, a polygon, a circle and a rectangle: each opens at the shape's centre
import { Circle, LeafletMap, Polygon, Polyline, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover each shape. A path\'s tooltip opens at its centre, wherever the pointer entered.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline(
    [
      [59.75, 23.4],
      [60.3, 23.8],
      [60.0, 24.4],
    ],
    { color: '#7cb7ff', weight: 5 },
  ).addTo(map);
  const polygon = new Polygon(
    [
      [60.35, 25.0],
      [60.1, 25.5],
      [60.4, 25.9],
    ],
    { color: '#34d399' },
  ).addTo(map);
  const circle = new Circle([59.8, 25.2], { radius: 30000, color: '#f59e0b' }).addTo(map);
  const rect = new Rectangle(
    [
      [59.6, 26.0],
      [59.95, 26.8],
    ],
    { color: '#f472b6' },
  ).addTo(map);

  const shapes = [
    { layer: line, text: 'Polyline', hit: [60.3, 23.8] },
    { layer: polygon, text: 'Polygon', hit: [60.12, 25.45] },
    { layer: circle, text: 'Circle', hit: [59.65, 25.3] },
    { layer: rect, text: 'Rectangle', hit: [59.65, 26.2] },
  ] as const;
  for (const s of shapes) s.layer.bindTooltip(s.text);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      shapes.flatMap((s) => [
        { run: () => g.over([s.hit[0], s.hit[1]], s.layer.getElement()), hold: 1300 },
        { run: () => g.out(s.layer.getElement()), hold: 300 },
      ]),
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
