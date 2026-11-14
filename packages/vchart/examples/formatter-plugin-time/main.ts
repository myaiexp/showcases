// Formatter plugin: time patterns in axis labels and tooltip
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const FORMATS = ['%Y-%m-%d', '%b %d', '%B %e, %Y', '%a %d %b', '%H:%M', '%d/%m/%y'];

// Eight daily points as millisecond timestamps (local time, around noon).
const rows = Array.from({ length: 8 }, (_, i) => ({
  time: new Date(2024, 5, 1 + i, 12, 30).getTime(),
  value: 20 + ((i * 13) % 25),
}));

const mount: Mount = (el, ctx) =>
  mountLive<{ format: string }>(el, ctx, {
    initial: { format: FORMATS[0] as string },
    build: ({ format }) =>
      ({
        type: 'bar',
        data: [{ id: 'days', values: rows }],
        xField: 'time',
        yField: 'value',
        axes: [
          // The band axis label is the timestamp; the pattern after the colon formats it as a date.
          { orient: 'bottom', type: 'band', label: { formatter: '{label:' + format + '}', autoRotate: true, autoHide: true } },
          { orient: 'left', type: 'linear' },
        ],
        tooltip: { mark: { title: { key: 'date', keyFormatter: '{time:' + format + '}' } } },
        animation: false,
      }) as never,
    controls(bar, live) {
      select(bar, 'axis label.formatter: {label:<pattern>}', FORMATS, (format) => live.set({ format }));
    },
    step: (_, i) => ({ format: FORMATS[i % FORMATS.length] as string }),
    previewMs: 1600,
  });

export default mount;
