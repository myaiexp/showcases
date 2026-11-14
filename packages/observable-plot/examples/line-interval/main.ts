// The interval option regularizes samples: gaps appear where an interval has no data
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const intervals = ['none', 'day', 'week', 'month'] as const;
const reducers = ['first', 'sum'] as const;
type Interval = (typeof intervals)[number];
type Reduce = (typeof reducers)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  // A few months of trading days: weekends are missing samples.
  const rows = aapl.slice(-90);
  return mountPlot<{ interval: Interval; reduce: Reduce }>(el, ctx, {
    initial: { interval: 'day', reduce: 'first' },
    render: ({ interval, reduce }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.lineY(rows, {
            x: 'Date',
            y: 'Close',
            interval: interval === 'none' ? undefined : interval,
            reduce,
            marker: 'dot',
          }),
        ],
      }),
    step: ({ interval }) => ({ interval: intervals[(intervals.indexOf(interval) + 1) % intervals.length] ?? 'none' }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'interval', intervals, live.state.interval, (interval) => live.set({ interval }));
      select(bar, 'reduce', reducers, live.state.reduce, (reduce) => live.set({ reduce }));
    },
  });
};

export default mount;
