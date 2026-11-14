// interval.range lists every boundary in a window, one period at a time
import * as Plot from '@observablehq/plot';
import type { LiteralTimeInterval } from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// Each period with a window wide enough to show a handful of boundaries.
const WINDOWS: Record<string, [string, string]> = {
  day: ['2013-04-01', '2013-04-20'],
  '2 days': ['2013-04-01', '2013-04-30'],
  week: ['2013-04-01', '2013-06-15'],
  monday: ['2013-04-01', '2013-06-15'],
  month: ['2013-01-01', '2014-01-01'],
  '3 months': ['2012-01-01', '2015-01-01'],
  quarter: ['2012-01-01', '2015-01-01'],
  half: ['2010-01-01', '2016-01-01'],
  year: ['2005-01-01', '2020-01-01'],
  '5 years': ['2000-01-01', '2040-01-01'],
};
const PERIODS = Object.keys(WINDOWS);

const mount: Mount = (el, ctx) =>
  mountPlot<{ period: string }>(el, ctx, {
    initial: { period: 'week' },
    render: ({ period }, { width, height, preview }) => {
      const [start, stop] = (WINDOWS[period] as [string, string]).map((d) => new Date(d)) as [Date, Date];
      const interval = Plot.utcInterval(period as LiteralTimeInterval);
      const boundaries = interval.range(start, stop);
      return Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `utcInterval("${period}").range` : undefined,
        x: { type: 'utc', domain: [start, stop], grid: false },
        y: { axis: null },
        marks: [
          Plot.ruleX(boundaries, { stroke: 'orange', strokeWidth: 2 }),
          Plot.dot(boundaries, { x: (d) => d, y: 0, fill: 'orange' }),
          Plot.text([`${boundaries.length} boundaries`], { frameAnchor: 'top-left', dy: 4, dx: 4, fillOpacity: 0.7 }),
        ],
      });
    },
    step: (_s, i) => ({ period: PERIODS[i % PERIODS.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'period', PERIODS, live.state.period, (period) => live.set({ period }));
    },
  });

export default mount;
