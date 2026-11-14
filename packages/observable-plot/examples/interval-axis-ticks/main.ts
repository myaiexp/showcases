// An interval as the x scale's ticks option: ticks on weeks, months, mondays
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TICKS = ['month', '2 months', 'quarter', 'week', '2 weeks', 'monday', 'half', 'year'];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-300);
  return mountPlot<{ ticks: string }>(el, ctx, {
    initial: { ticks: 'month' },
    render: ({ ticks }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `ticks: "${ticks}"` : undefined,
        // Weekly ticks crowd the axis; the grid shows them all, labels thin out in a card.
        x: { ticks: ticks as 'month', grid: true, tickFormat: preview ? '%b %d' : undefined },
        y: { grid: true },
        marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' })],
      }),
    step: (_s, i) => ({ ticks: TICKS[i % TICKS.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'x.ticks', TICKS, live.state.ticks, (ticks) => live.set({ ticks }));
    },
  });
};

export default mount;
