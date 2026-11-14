// Axis label formatting: formatMethod, formatter, rich text, space and inside
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [24000, 41000, 36500, 72000, 58000, 91000].map((v, i) => ({ m: `M${i + 1}`, v }));
const FORMATS: Record<string, Record<string, unknown>> = {
  plain: {},
  'formatMethod: currency': { formatMethod: (text: unknown) => '$' + Number(text).toLocaleString('en-US') },
  'formatMethod: k suffix': { formatMethod: (text: unknown) => `${Number(text) / 1000}k` },
  'formatter: {label:~s}': { formatter: '{label:~s}' },
  'rich text': {
    formatMethod: (text: unknown) => ({
      type: 'rich',
      text: [
        { text: `${Number(text) / 1000}`, fontSize: 14, fontWeight: 'bold', fill: '#ffd43b' },
        { text: ' k', fontSize: 9, fill: '#adb5bd' },
      ],
    }),
  },
};
interface State { format: string; space: number; inside: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'm',
    yField: 'v',
    axes: [{ orient: 'left', label: { ...FORMATS[s.format], space: s.space, inside: s.inside } }, { orient: 'bottom', type: 'band' }],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { format: 'formatMethod: currency', space: 8, inside: false },
    build,
    mode: 'rebuild',
    step: (s) => {
      const names = Object.keys(FORMATS);
      return { format: names[(names.indexOf(s.format) + 1) % names.length] ?? 'plain' };
    },
    controls: (bar, live) => {
      select(bar, 'format', Object.keys(FORMATS), (v) => live.set({ format: v })).value = 'formatMethod: currency';
      slider(bar, 'space', [0, 40, 2], 8, (v) => live.set({ space: v }));
      select(bar, 'inside', ['false', 'true'], (v) => live.set({ inside: v === 'true' }));
    },
  });

export default mount;
