// Tip: pool true shows one tip at a time; pool false lets two pointer tips show
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ pool: boolean }>(el, ctx, {
    initial: { pool: true },
    render: ({ pool }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.lineY(aapl, { x: 'Date', y: 'High', stroke: 'seagreen' }),
          Plot.lineY(aapl, { x: 'Date', y: 'Low', stroke: 'tomato' }),
          // Two tip marks, each with its own pointer transform. Pooled, only the closer shows.
          Plot.tip(aapl, Plot.pointerX({ x: 'Date', y: 'High', anchor: 'bottom', pool })),
          Plot.tip(aapl, Plot.pointerX({ x: 'Date', y: 'Low', anchor: 'top', pool })),
        ],
      }),
    step: ({ pool }) => ({ pool: !pool }),
    previewMs: 4000,
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 4000) : undefined),
    controls: (bar, live) => {
      toggle(bar, 'pool', live.state.pool, (pool) => live.set({ pool }));
    },
  });
};

export default mount;
