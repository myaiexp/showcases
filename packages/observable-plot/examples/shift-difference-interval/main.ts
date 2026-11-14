// Shift transform: shiftX derives x1 so differenceY compares with the past
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ shift: number }>(el, ctx, {
    initial: { shift: 365 },
    render: ({ shift }, { width, height }) =>
      // Green where the price rose over the interval, blue where it fell; the first interval is cut.
      Plot.differenceY(aapl, Plot.shiftX(`${shift} days`, { x: 'Date', y: 'Close' })).plot({ width, height, y: { grid: true } }),
    step: (_s, i) => ({ shift: [365, 30, 180, 730, 7][i % 5] ?? 365 }),
    previewMs: 2200,
    controls: (bar, live) => {
      slider(bar, 'shift (days)', [0, 1000, 1], live.state.shift, (shift) => live.set({ shift }));
    },
  });
};

export default mount;
