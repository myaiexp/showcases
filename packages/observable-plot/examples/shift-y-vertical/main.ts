// Shift transform on y: shiftY with differenceX, time down the page
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SHIFTS = ['7 days', '1 month', '+6 months', '1 year', 'week', 'monday'] as const;
type Shift = (typeof SHIFTS)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ shift: Shift }>(el, ctx, {
    initial: { shift: '1 year' },
    render: ({ shift }, { width, height }) =>
      // Time runs down the y axis, so shiftY derives y1 and the difference is horizontal.
      Plot.differenceX(aapl, Plot.shiftY(shift, { y: 'Date', x: 'Close' })).plot({ width, height, x: { grid: true } }),
    step: ({ shift }) => ({ shift: SHIFTS[(SHIFTS.indexOf(shift) + 1) % SHIFTS.length] ?? '1 year' }),
    controls: (bar, live) => {
      select(bar, 'interval', SHIFTS, live.state.shift, (shift) => live.set({ shift }));
    },
  });
};

export default mount;
