// A numeric channel value as a constant: an area with a fixed y1 baseline
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ base: number }>(el, ctx, {
    initial: { base: 0 },
    render: ({ base }, { width, height }) =>
      Plot.area(aapl, { x1: 'Date', y1: base, y2: 'Close' }).plot({ width, height, y: { grid: true, domain: [0, 100] } }),
    // The card slides the baseline up and down.
    step: (_s, i) => ({ base: [0, 40, 70, 20][i % 4] }),
    previewMs: 1600,
    controls: (bar, live) => {
      slider(bar, 'y1 constant: ', [0, 90, 1], 0, (base) => live.set({ base }));
    },
  });
};

export default mount;
