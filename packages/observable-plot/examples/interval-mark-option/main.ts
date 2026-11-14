// The interval option on a rectY: each Date becomes a [start, stop) extent
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const INTERVALS = ['day', 'week', 'month', '2 weeks', 'quarter'];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-120);
  return mountPlot<{ interval: string }>(el, ctx, {
    initial: { interval: 'day' },
    render: ({ interval }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `interval: "${interval}"` : undefined,
        y: { grid: true, transform: (d: number) => d / 1e6, label: 'Daily trade volume (millions)' },
        marks: [
          // Rects that share an interval stack on one another, so a week is the sum of its days.
          Plot.rectY(aapl, { x: 'Date', y: 'Volume', interval: interval as 'day', fill: 'steelblue', stroke: 'var(--bg)', strokeWidth: 0.5 }),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ interval: INTERVALS[i % INTERVALS.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'interval', INTERVALS, live.state.interval, (interval) => live.set({ interval }));
    },
  });
};

export default mount;
