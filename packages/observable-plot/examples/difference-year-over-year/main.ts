// differenceY of a series against itself, shifted by an interval
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SHIFTS = ['+1 year', '+6 months', '+1 month'] as const;
type Shift = (typeof SHIFTS)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ shift: Shift }>(el, ctx, {
    initial: { shift: '+1 year' },
    render: ({ shift }, { width, height }) =>
      Plot.differenceY(aapl, Plot.shiftX(shift, { x: 'Date', y: 'Close' })).plot({ width, height, y: { grid: true } }),
    step: ({ shift }) => ({ shift: SHIFTS[(SHIFTS.indexOf(shift) + 1) % SHIFTS.length] }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'shiftX', SHIFTS, live.state.shift, (shift) => live.set({ shift }));
    },
  });
};

export default mount;
