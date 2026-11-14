// Density contours over a scatterplot, with bandwidth and thresholds
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tsv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const faithful = await tsv('faithful.tsv');
  return mountPlot<{ bandwidth: number; thresholds: number }>(el, ctx, {
    initial: { bandwidth: 20, thresholds: 20 },
    render: ({ bandwidth, thresholds }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 20,
        marks: [
          Plot.density(faithful, { x: 'waiting', y: 'eruptions', bandwidth, thresholds, stroke: 'blue', strokeWidth: 0.25 }),
          Plot.density(faithful, { x: 'waiting', y: 'eruptions', bandwidth, thresholds: 4, stroke: 'blue' }),
          Plot.dot(faithful, { x: 'waiting', y: 'eruptions', fill: 'currentColor', r: 1.5 }),
        ],
      }),
    step: (_s, i) => ({ bandwidth: [20, 8, 30, 14][i % 4], thresholds: [20, 10, 30][i % 3] }),
    previewMs: 2400,
    controls: (bar, live) => {
      slider(bar, 'bandwidth', [0, 40, 0.2], live.state.bandwidth, (bandwidth) => live.set({ bandwidth }));
      slider(bar, 'thresholds', [1, 40, 1], live.state.thresholds, (thresholds) => live.set({ thresholds }));
    },
  });
};

export default mount;
