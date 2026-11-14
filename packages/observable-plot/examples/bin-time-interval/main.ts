// Temporal bins: AAPL close averaged per day, week, month or year
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const INTERVALS = ['week', 'month', 'quarter', 'year'] as const;

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { interval: 'month' as (typeof INTERVALS)[number] },
    render: ({ interval }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'mean close ($)' },
        marks: [
          Plot.rectY(aapl, Plot.binX<Plot.RectYOptions>({ y: 'mean' }, { x: 'Date', y: 'Close', thresholds: interval === 'quarter' ? '3 months' : interval })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ interval }) => ({ interval: INTERVALS[(INTERVALS.indexOf(interval) + 1) % INTERVALS.length] ?? 'month' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'interval', INTERVALS, live.state.interval, (interval) => live.set({ interval }));
    },
  });
};

export default mount;
