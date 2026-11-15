/** @jsxImportSource @antv/infographic */
// Polygon scenes: a triangle, a star and a hexagon from point arrays
import type { JSXElement, Point } from '@antv/infographic';
import { Polygon } from '@antv/infographic';

/** A regular polygon with `n` corners around (cx, cy); `inner` makes a star. */
const ring = (n: number, cx: number, cy: number, r: number, inner = 1): Point[] =>
  Array.from({ length: n * (inner === 1 ? 1 : 2) }, (_, i) => {
    const a = (i * Math.PI * 2) / (n * (inner === 1 ? 1 : 2)) - Math.PI / 2;
    const rr = inner !== 1 && i % 2 ? r * inner : r;
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
  });

export const SCENES: { say: string; node: JSXElement }[] = [
  {
    say: 'points={[{x, y}, ...]}: three points',
    node: <Polygon points={[{ x: 160, y: 20 }, { x: 260, y: 180 }, { x: 60, y: 180 }]} fill="#f472b6" />,
  },
  { say: 'ten points alternate two radii: a star', node: <Polygon points={ring(5, 160, 105, 90, 0.45)} fill="#facc15" stroke="#a16207" strokeWidth={3} /> },
  { say: 'six points on one radius: a hexagon', node: <Polygon points={ring(6, 160, 100, 85)} fill="#2dd4bf" stroke="#115e59" strokeWidth={4} /> },
];
