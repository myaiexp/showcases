// Symlog axis: axes.type 'symlog' handles negative values, constant sets the linear region
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [-8000, -400, -20, -1, 0, 1, 20, 400, 8000].map((y, i) => ({ id: `p${i}`, y }));
interface State { type: 'linear' | 'symlog'; constant: number }

const build = (s: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'id',
    yField: 'y',
    label: { visible: true },
    axes: [
      { orient: 'left', type: s.type, ...(s.type === 'symlog' ? { constant: s.constant } : {}) },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { type: 'symlog', constant: 10 },
    build,
    mode: 'rebuild',
    step: (s, i) => ({ type: s.type === 'symlog' ? 'linear' : 'symlog', constant: i % 4 < 2 ? 10 : 100 }),
    controls: (bar, live) => {
      select(bar, 'axis type', ['symlog', 'linear'], (v) => live.set({ type: v as State['type'] })).value = 'symlog';
      slider(bar, 'constant', [1, 200, 1], 10, (v) => live.set({ constant: v }));
    },
  });

export default mount;
