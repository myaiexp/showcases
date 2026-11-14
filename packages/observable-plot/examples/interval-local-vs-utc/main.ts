// timeInterval cuts at local boundaries, utcInterval at UTC ones
import * as Plot from '@observablehq/plot';
import type { LiteralTimeInterval } from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const PERIODS = ['day', 'week', 'month', 'monday'];
const WINDOWS: Record<string, [string, string]> = {
  day: ['2013-04-10T12:00Z', '2013-04-14T12:00Z'],
  week: ['2013-04-01T00:00Z', '2013-05-12T00:00Z'],
  monday: ['2013-04-01T00:00Z', '2013-05-12T00:00Z'],
  month: ['2012-12-15T00:00Z', '2013-05-15T00:00Z'],
};

const mount: Mount = (el, ctx) =>
  mountPlot<{ period: string }>(el, ctx, {
    initial: { period: 'day' },
    render: ({ period }, { width, height, preview }) => {
      const [start, stop] = (WINDOWS[period] as [string, string]).map((d) => new Date(d)) as [Date, Date];
      const p = period as LiteralTimeInterval;
      const rows = [
        ...Plot.timeInterval(p).range(start, stop).map((at) => ({ at, kind: 'timeInterval (local)' })),
        ...Plot.utcInterval(p).range(start, stop).map((at) => ({ at, kind: 'utcInterval (UTC)' })),
      ];
      const offset = -new Date().getTimezoneOffset() / 60;
      return Plot.plot({
        width,
        height,
        marginLeft: preview ? 20 : 130,
        marginTop: 24,
        title: preview ? `${period}, your timezone is UTC${offset >= 0 ? '+' : ''}${offset}` : undefined,
        subtitle: preview ? undefined : `Your timezone is UTC${offset >= 0 ? '+' : ''}${offset}: the two rows coincide only at UTC+0.`,
        x: { type: 'utc', domain: [start, stop] },
        y: { label: null, axis: preview ? null : 'left' },
        color: { domain: ['timeInterval (local)', 'utcInterval (UTC)'], range: ['steelblue', 'orange'] },
        marks: [
          Plot.tickX(rows, { x: 'at', y: 'kind', stroke: 'kind', strokeWidth: 2 }),
          Plot.dot(rows, { x: 'at', y: 'kind', fill: 'kind' }),
        ],
      });
    },
    step: (_s, i) => ({ period: PERIODS[i % PERIODS.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'period', PERIODS, live.state.period, (period) => live.set({ period }));
    },
  });

export default mount;
