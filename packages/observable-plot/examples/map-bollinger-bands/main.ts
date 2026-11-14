// Map transform with bollinger: price, rolling mean and k-deviation band
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ n: number; k: number }>(el, ctx, {
    initial: { n: 20, k: 2 },
    render: ({ n, k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.areaY(aapl, Plot.map({ y1: Plot.bollinger({ n, k: -k }), y2: Plot.bollinger({ n, k }) }, { x: 'Date', y: 'Close', fillOpacity: 0.2 })),
          Plot.lineY(aapl, Plot.map({ y: Plot.bollinger({ n }) }, { x: 'Date', y: 'Close', stroke: 'blue' })),
          Plot.lineY(aapl, { x: 'Date', y: 'Close', strokeWidth: 1 }),
        ],
      }),
    step: (_s, i) => ({ n: [20, 60, 10, 90][i % 4] ?? 20, k: [2, 1, 3, 2][i % 4] ?? 2 }),
    controls: (bar, live) => {
      slider(bar, 'window size (n)', [1, 100, 1], live.state.n, (n) => live.set({ n }));
      slider(bar, 'radius (k)', [0, 10, 0.1], live.state.k, (k) => live.set({ k }));
    },
  });
};

export default mount;
