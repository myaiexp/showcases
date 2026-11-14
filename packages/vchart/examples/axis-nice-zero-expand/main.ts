// Nice, zero, niceType and expand: how a linear axis picks its range when min and max are not set
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [43, 61, 52, 78, 69, 91, 84].map((v, i) => ({ d: `D${i + 1}`, v }));
interface State { nice: boolean; zero: boolean; niceType: 'tickCountFirst' | 'accurateFirst'; expand: number; tickCount: number }
const SCENES: Partial<State>[] = [
  { nice: true, zero: true, expand: 0 },
  { nice: true, zero: false, expand: 0 },
  { nice: false, zero: false, expand: 0 },
  { nice: false, zero: false, expand: 0.25 },
];

const build = (s: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'd',
    yField: 'v',
    axes: [
      { orient: 'left', nice: s.nice, zero: s.zero, niceType: s.niceType, expand: { min: s.expand, max: s.expand }, tick: { tickCount: s.tickCount } },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const bool = (v: string): boolean => v === 'true';
const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { nice: true, zero: true, niceType: 'tickCountFirst', expand: 0, tickCount: 5 },
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'nice', ['true', 'false'], (v) => live.set({ nice: bool(v) }));
      select(bar, 'zero', ['true', 'false'], (v) => live.set({ zero: bool(v) }));
      select(bar, 'niceType', ['tickCountFirst', 'accurateFirst'], (v) => live.set({ niceType: v as State['niceType'] }));
      slider(bar, 'expand', [0, 0.5, 0.05], 0, (v) => live.set({ expand: v }));
      slider(bar, 'tickCount', [2, 10, 1], 5, (v) => live.set({ tickCount: v }));
    },
  });

export default mount;
