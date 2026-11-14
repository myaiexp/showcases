// One density mark, bandwidth as a number and thresholds as a count or array
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { tsv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['count', 'explicit values'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const faithful = await tsv('faithful.tsv');
  return mountPlot<{ bandwidth: number; count: number; mode: Mode }>(el, ctx, {
    initial: { bandwidth: 20, count: 20, mode: 'count' },
    render: ({ bandwidth, count, mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 20,
        marks: [
          Plot.density(faithful, {
            x: 'waiting',
            y: 'eruptions',
            bandwidth,
            // Explicit values are densities per 100px² square; the maximum here is near 10.
            thresholds: mode === 'count' ? count : [0.5, 1, 2, 4, 8],
          }),
          Plot.dot(faithful, { x: 'waiting', y: 'eruptions' }),
        ],
      }),
    step: (_s, i) => ({ bandwidth: [20, 6, 12, 32][i % 4], mode: i % 5 === 4 ? 'explicit values' : 'count', count: [20, 4, 10][i % 3] }),
    previewMs: 2400,
    controls: (bar, live) => {
      slider(bar, 'bandwidth', [0, 40, 0.2], live.state.bandwidth, (bandwidth) => live.set({ bandwidth }));
      select(bar, 'thresholds', MODES, live.state.mode, (mode) => live.set({ mode }));
      slider(bar, 'count', [1, 40, 1], live.state.count, (count) => live.set({ count }));
    },
  });
};

export default mount;
