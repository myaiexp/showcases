// Band padding: paddingInner, paddingOuter and trimPadding on a grouped bar chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((q, i) => [
  { q, team: 'Red', n: [30, 44, 38, 52][i] },
  { q, team: 'Blue', n: [24, 36, 47, 41][i] },
]);
interface State { inner: number; outer: number; trim: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: ['q', 'team'],
    yField: 'n',
    seriesField: 'team',
    axes: [
      { orient: 'bottom', type: 'band', trimPadding: s.trim, paddingInner: [s.inner, 0.05], paddingOuter: [s.outer, 0.05] },
      { orient: 'left' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { inner: 0.1, outer: 0.3, trim: false },
    build,
    mode: 'rebuild',
    step: (_s, i) => ({ inner: [0.1, 0.6, 0.1, 0.1][i % 4] ?? 0.1, outer: [0.3, 0.3, 0.8, 0.3][i % 4] ?? 0.3, trim: i % 4 === 3 }),
    controls: (bar, live) => {
      slider(bar, 'paddingInner', [0, 0.9, 0.05], 0.1, (v) => live.set({ inner: v }));
      slider(bar, 'paddingOuter', [0, 0.9, 0.05], 0.3, (v) => live.set({ outer: v }));
      select(bar, 'trimPadding', ['false', 'true'], (v) => live.set({ trim: v === 'true' }));
    },
  });

export default mount;
