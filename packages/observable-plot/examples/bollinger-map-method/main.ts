// The bollinger map method: lower and upper bands as lines through mapY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ n: number }>(el, ctx, {
    initial: { n: 20 },
    render: ({ n }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          // Here k defaults to zero, so k: -2 and k: 2 give the lower and upper bands.
          Plot.lineY(aapl, Plot.mapY(Plot.bollinger({ n, k: -2 }), { x: 'Date', y: 'Close', stroke: 'red' })),
          Plot.lineY(aapl, Plot.mapY(Plot.bollinger({ n, k: 2 }), { x: 'Date', y: 'Close', stroke: 'green' })),
          Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
        ],
      }),
    step: ({ n }) => ({ n: n === 20 ? 60 : n === 60 ? 8 : 20 }),
    controls: (bar, live) => {
      slider(bar, 'Window size (n)', [2, 100, 1], 20, (n) => live.set({ n }));
    },
  });
};

export default mount;
