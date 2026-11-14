// Interval transform: band scale versus rectY with interval day
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const recent = aapl.slice(-40);
  return mountPlot<{ interval: boolean }>(el, ctx, {
    initial: { interval: true },
    render: ({ interval }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginBottom: interval || preview ? undefined : 80,
        x: interval ? {} : { type: 'band' },
        y: { grid: true, transform: (d: number) => d / 1e6, label: 'Daily trade volume (millions)' },
        marks: [
          // With interval the x scale is utc: ticks fall on week starts and the market gaps show.
          interval ? Plot.rectY(recent, { x: 'Date', interval: 'day', y: 'Volume' }) : Plot.barY(recent, { x: 'Date', y: 'Volume' }),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ interval }) => ({ interval: !interval }),
    controls: (bar, live) => {
      toggle(bar, 'interval: day (rectY, utc scale)', live.state.interval, (interval) => live.set({ interval }));
    },
  });
};

export default mount;
