// Directed graph edges: arrows between three nodes, width by transition weight
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

type P = [number, number];
type Edge = [P, P, number];

const matrix = [
  [3, 2, 5],
  [1, 7, 2],
  [1, 1, 8],
];
const nodes: P[] = matrix.map((_, i) => d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100));
const at = (i: number): P => nodes[i] ?? [0, 0];
const edges: Edge[] = matrix.flatMap((m, i) => m.map((value, j): Edge => [at(i), at(j), value]));

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height, preview }) => {
    const k = preview ? 0.3 : 1; // scale the pixel-sized options down for a 200px card
    return Plot.plot({
      width,
      height,
      inset: preview ? 30 : 60,
      aspectRatio: 1,
      axis: null,
      marks: [
        Plot.dot(nodes, { r: 40 * k }),
        Plot.arrow(edges, {
          x1: ([[x1]]) => x1,
          y1: ([[, y1]]) => y1,
          x2: ([, [x2]]) => x2,
          y2: ([, [, y2]]) => y2,
          bend: true,
          strokeWidth: ([, , value]) => value * (preview ? 0.5 : 1),
          strokeLinejoin: 'miter',
          headLength: 24 * (preview ? 0.5 : 1),
          inset: 48 * k,
        }),
        Plot.text(nodes, { text: ['A', 'B', 'C'], dy: 12 * k }),
        Plot.text(edges, {
          x: ([[x1, y1], [x2, y2]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
          y: ([[x1, y1], [x2, y2]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
          text: ([, , value]) => value,
        }),
      ],
    });
  });

export default mount;
