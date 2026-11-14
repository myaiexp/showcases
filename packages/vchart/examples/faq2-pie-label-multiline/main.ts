// FAQ: label.formatMethod returning an array draws a label on several lines
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = [
  { type: 'Tradition', value: 61 },
  { type: 'Business', value: 38 },
  { type: 'Customer-facing', value: 24 },
  { type: 'Others', value: 12 },
];
const total = values.reduce((s, d) => s + d.value, 0);

const MODES = ['one line', 'two lines', 'three lines'] as const;
interface S {
  lines: (typeof MODES)[number];
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { lines: 'two lines' },
    previewMs: 1500,
    step: (s) => ({ lines: MODES[(MODES.indexOf(s.lines) + 1) % 3] as S['lines'] }),
    controls: (bar, live) => {
      select(bar, 'label lines', MODES, (v) => live.set({ lines: v as S['lines'] })).value = live.state.lines;
    },
    build: (s): ISpec =>
      ({
        type: 'pie',
        data: [{ id: 'd', values }],
        valueField: 'value',
        categoryField: 'type',
        outerRadius: 0.7,
        label: {
          visible: true,
          // The array is one string per line.
          formatMethod: (text: string, datum: { value: number }) =>
            s.lines === 'one line'
              ? text
              : s.lines === 'two lines'
                ? [text, `${datum.value}`]
                : [text, `${datum.value}`, `${Math.round((datum.value / total) * 100)}%`],
        },
        legends: { visible: false },
      }) as unknown as ISpec,
  });

export default mount;
