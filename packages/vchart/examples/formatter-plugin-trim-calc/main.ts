// Formatter plugin extras: t, z, ~ and calc() expressions
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const FORMATS = ['{value:.2f}', '{value:.2t}', '{value:.2z}', '{value:~s}', '{value:s}', 'calc(v / 1000)', 'calc(v * 2 + 1)'];

// 12.3893333 rounds to 12.39 with f but truncates to 12.38 with t; 100 keeps no decimals with z; 1500 is 1.5k with ~s.
const rows = [
  { name: 'A', value: 12.3893333 },
  { name: 'B', value: 100 },
  { name: 'C', value: 1500 },
  { name: 'D', value: 7.5 },
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
        // A plain string starting with calc( is evaluated with v standing for the label's value.
        label: { visible: true, formatter: format, style: { fill: '#E6E9F2', fontSize: ctx.preview ? 11 : 14 } },
        axes: [
          { orient: 'bottom', type: 'band' },
          { orient: 'left', type: 'linear', max: 2000 },
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
