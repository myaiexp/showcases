// Tick configuration: tickCount, tickStep, forceTickCount, tickMode and noDecimals
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [0.4, 1.3, 0.9, 2.6, 1.8, 3.7, 2.2].map((v, i) => ({ k: `K${i + 1}`, v }));
const KINDS = ['tickCount', 'tickStep', 'forceTickCount'] as const;
interface State { kind: (typeof KINDS)[number]; value: number; mode: 'average' | 'd3'; noDecimals: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      { orient: 'left', tick: { [s.kind]: s.value, tickMode: s.mode, noDecimals: s.noDecimals }, grid: { visible: true } },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const SCENES: Partial<State>[] = [
  { kind: 'tickCount', value: 5, noDecimals: false },
  { kind: 'tickCount', value: 8, noDecimals: false },
  { kind: 'tickStep', value: 0.5, noDecimals: false },
  { kind: 'forceTickCount', value: 6, noDecimals: false },
  { kind: 'tickCount', value: 6, noDecimals: true },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { kind: 'tickCount', value: 5, mode: 'average', noDecimals: false },
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'option', KINDS, (v) => live.set({ kind: v as State['kind'] }));
      slider(bar, 'value', [0.25, 10, 0.25], 5, (v) => live.set({ value: v }));
      select(bar, 'tickMode', ['average', 'd3'], (v) => live.set({ mode: v as State['mode'] }));
      select(bar, 'noDecimals', ['false', 'true'], (v) => live.set({ noDecimals: v === 'true' }));
    },
  });

export default mount;
