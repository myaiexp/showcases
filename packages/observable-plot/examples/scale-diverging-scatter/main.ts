// Temperature anomalies on a diverging BuRd scale, with pivot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('gistemp.csv');
  const gistemp = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { pivot: 0, symmetric: true },
    render: ({ pivot, symmetric }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        color: { type: 'diverging', scheme: 'BuRd', pivot, symmetric },
        marks: [Plot.ruleY([0]), Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })],
      }),
    step: (_s, i) => ({ pivot: [0, 0.5, -0.3, 0][i % 4], symmetric: i % 4 !== 3 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'pivot ', [-1, 1, 0.05], live.state.pivot, (pivot) => live.set({ pivot }));
      toggle(bar, 'symmetric ', live.state.symmetric, (symmetric) => live.set({ symmetric }));
    },
  });
};

export default mount;
