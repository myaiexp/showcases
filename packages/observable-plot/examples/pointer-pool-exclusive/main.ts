// The pool option: pointer marks either show together or compete for one focus
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
          Plot.lineY(aapl, { x: 'Date', y: 'Close', strokeOpacity: 0.4 }),
          Plot.lineY(aapl, Plot.windowY(28, { x: 'Date', y: 'Close', stroke: 'orange' })),
          Plot.dot(aapl, Plot.pointerX({ x: 'Date', y: 'Close', r: 6, fill: 'steelblue', pool })),
          Plot.dot(aapl, Plot.pointerX(Plot.windowY(28, { x: 'Date', y: 'Close', r: 6, fill: 'orange', pool }))),
        ],
      }),
    step: ({ pool }, i) => ({ pool: i % 3 === 2 ? !pool : pool }),
    previewMs: 1800,
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5 + 0.4 * Math.sin(t * Math.PI * 6)], 5400) : undefined,
    controls: (bar, live) => {
      toggle(bar, 'pool: true (one mark at a time)', live.state.pool, (pool) => live.set({ pool }));
    },
  });
};

export default mount;
