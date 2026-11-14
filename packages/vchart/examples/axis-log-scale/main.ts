// Log axis: axes.type 'log' with a base, compared with the linear scale
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const VALUES = [3, 12, 45, 230, 900, 4100, 19000, 88000];
const data = VALUES.map((y, i) => ({ step: `step ${i + 1}`, y }));

interface State { type: 'linear' | 'log'; base: number }

const build = (s: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'step',
    yField: 'y',
    label: { visible: true },
    axes: [
      { orient: 'left', type: s.type, ...(s.type === 'log' ? { base: s.base } : {}) },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { type: 'log', base: 10 },
    build,
    mode: 'rebuild',
    step: (s, i) => ({ type: s.type === 'log' ? 'linear' : 'log', base: i % 4 < 2 ? 10 : 2 }),
    controls: (bar, live) => {
      select(bar, 'axis type', ['log', 'linear'], (v) => live.set({ type: v as State['type'] })).value = 'log';
      slider(bar, 'base', [2, 10, 1], 10, (v) => live.set({ base: v }));
    },
  });

export default mount;
