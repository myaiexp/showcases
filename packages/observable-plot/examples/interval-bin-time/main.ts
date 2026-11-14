// binX with a time interval: Apple's daily volume summed per period
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const INTERVALS = ['week', '2 weeks', 'month', 'quarter', 'half', 'year'];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ interval: string }>(el, ctx, {
    initial: { interval: 'month' },
    render: ({ interval }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `interval: "${interval}"` : undefined,
        y: { grid: true, transform: (d: number) => d / 1e9, label: 'Total volume (billions)' },
        marks: [
          Plot.rectY(aapl, Plot.binX<Plot.RectYOptions>({ y: 'sum' }, { x: 'Date', y: 'Volume', interval: interval as 'week', fill: 'steelblue' })),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ interval: INTERVALS[i % INTERVALS.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'interval', INTERVALS, live.state.interval, (interval) => live.set({ interval }));
    },
  });
};

export default mount;
