// Formatter plugin: d3-style number formats in labels
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const FORMATS = ['{value:,.0f}', '{value:.2f}', '{value:,.1f}', '{value:.0%}', '{value:.1%}', '{value:~s}', '{value:s}', '{value:e}', '{value:$,.0f}', '{value:x}'];

// Values that show what each format does: a big one, a fraction near 1, a small one, an exact thousand.
const rows = [
  { name: 'A', value: 1234567.891 },
  { name: 'B', value: 0.8421 },
  { name: 'C', value: 15.5 },
  { name: 'D', value: 1500 },
  { name: 'E', value: 99.995 },
];

const mount: Mount = (el, ctx) =>
  mountLive<{ format: string }>(el, ctx, {
    initial: { format: FORMATS[0] as string },
    build: ({ format }) =>
      ({
        type: 'bar',
        data: [{ id: 'rows', values: rows }],
        xField: 'name',
        yField: 'value',
        // The plugin reads the string: the variable name in braces, then a colon and the format.
        label: { visible: true, formatter: format, style: { fill: '#E6E9F2', fontSize: ctx.preview ? 10 : 13 } },
        axes: [
          { orient: 'bottom', type: 'band' },
          // Axis labels take the same formatter; here the tick value itself is `label`.
          { orient: 'left', type: 'linear', label: { formatter: '{label:~s}' } },
        ],
        animation: false,
      }) as never,
    controls(bar, live) {
      select(bar, 'label.formatter', FORMATS, (format) => live.set({ format }));
    },
    step: (_, i) => ({ format: FORMATS[i % FORMATS.length] as string }),
    previewMs: 1500,
  });

export default mount;
