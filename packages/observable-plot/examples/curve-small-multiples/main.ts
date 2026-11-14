// All twenty curves at once as small multiples, one facet per curve name
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const CURVES = [
  'basis', 'basis-open', 'basis-closed', 'bump-x', 'bump-y', 'bundle', 'cardinal', 'cardinal-open', 'cardinal-closed',
  'catmull-rom', 'catmull-rom-open', 'catmull-rom-closed', 'linear', 'linear-closed', 'monotone-x', 'monotone-y',
  'natural', 'step', 'step-after', 'step-before',
] as const;

const values = d3.range(8).map(d3.randomLcg(11));
const COLS = 5;

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height, preview }) => {
    const shown = preview ? CURVES.slice(0, 10) : CURVES;
    return Plot.plot({
      width,
      height,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 8,
      x: { axis: null },
      y: { axis: null },
      fx: { axis: null },
      fy: { axis: null },
      marks: [Plot.frame({ stroke: 'currentColor', strokeOpacity: 0.2 }), ...shown.flatMap((curve, k) => {
        const facet = { fx: k % COLS, fy: Math.floor(k / COLS) };
        const rows = values.map((v, i) => ({ i, v, ...facet }));
        return [
          Plot.line(rows, { x: 'i', y: 'v', fx: 'fx', fy: 'fy', curve, stroke: 'orange', strokeWidth: 1.5 }),
          Plot.dot(rows, { x: 'i', y: 'v', fx: 'fx', fy: 'fy', r: 1.5 }),
          Plot.text([curve], { frameAnchor: 'top-left', fx: [facet.fx], fy: [facet.fy], dx: 4, dy: 4, fontSize: preview ? 8 : 11, fillOpacity: 0.8 }),
        ];
      })],
    });
  });

export default mount;
