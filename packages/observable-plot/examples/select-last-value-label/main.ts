// Select transform: selectLast labels the final close of a line chart
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const label = { x: 'Date', y: 'Close', text: 'Close', frameAnchor: 'bottom', dy: -6 } as const;
  return mountPlot<{ first: boolean }>(el, ctx, {
    initial: { first: false },
    render: ({ first }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.ruleY([0]),
          Plot.line(aapl, { x: 'Date', y: 'Close' }),
          // First and last follow input order, and this file is oldest first.
          Plot.text(aapl, first ? Plot.selectFirst({ ...label }) : Plot.selectLast({ ...label })),
        ],
      }),
    step: ({ first }) => ({ first: !first }),
    controls: (bar, live) => {
      toggle(bar, 'selectFirst instead of selectLast', live.state.first, (first) => live.set({ first }));
    },
  });
};

export default mount;
