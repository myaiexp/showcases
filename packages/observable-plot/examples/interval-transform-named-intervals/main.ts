// Interval transform: rectY widens each date to day, week or month
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const INTERVALS = ['day', 'week', 'month'] as const;
type Interval = (typeof INTERVALS)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const recent = aapl.slice(-120);
  return mountPlot<{ interval: Interval }>(el, ctx, {
    initial: { interval: 'day' },
    render: ({ interval }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, transform: (d: number) => d / 1e6, label: 'Daily trade volume (millions)' },
        // Each day becomes [floor, floor + 1 interval]; wider intervals overlap into stacked-looking bars.
        marks: [Plot.rectY(recent, { x: 'Date', interval, y: 'Volume', fillOpacity: 0.6 }), Plot.ruleY([0])],
      }),
    step: ({ interval }) => ({ interval: INTERVALS[(INTERVALS.indexOf(interval) + 1) % INTERVALS.length] ?? 'day' }),
    controls: (bar, live) => {
      select(bar, 'interval', INTERVALS, live.state.interval, (interval) => live.set({ interval }));
    },
  });
};

export default mount;
