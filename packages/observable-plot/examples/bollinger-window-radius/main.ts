// Bollinger bands on Apple stock, with sliders for window size n and radius k
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ n: number; k: number }>(el, ctx, {
    initial: { n: 20, k: 2 },
    render: ({ n, k }, { width, height }) => Plot.bollingerY(aapl, { x: 'Date', y: 'Close', n, k }).plot({ width, height }),
    step: (_s, i) => ({ n: [20, 5, 50, 100][i % 4], k: [2, 1, 3, 2][i % 4] }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'Window size (n)', [1, 100, 1], 20, (n) => live.set({ n }));
      slider(bar, 'Radius (k)', [0, 10, 0.1], 2, (k) => live.set({ k }));
    },
  });
};

export default mount;
