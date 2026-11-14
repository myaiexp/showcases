// Axis orient and inverse: where an axis sits and which way it runs
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [14, 32, 27, 55, 43, 68].map((v, i) => ({ k: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i], v }));
interface State { xOrient: 'bottom' | 'top'; yOrient: 'left' | 'right'; xInverse: boolean; yInverse: boolean }
const SCENES: Partial<State>[] = [
  { xOrient: 'bottom', yOrient: 'left', xInverse: false, yInverse: false },
  { xOrient: 'top', yOrient: 'left', xInverse: false, yInverse: false },
  { xOrient: 'top', yOrient: 'right', xInverse: true, yInverse: false },
  { xOrient: 'bottom', yOrient: 'right', xInverse: true, yInverse: true },
];

const build = (s: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      { orient: s.xOrient, type: 'band', inverse: s.xInverse },
      { orient: s.yOrient, inverse: s.yInverse },
    ],
  }) as unknown as ISpec;

const bool = (v: string): boolean => v === 'true';
const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: SCENES[0] as State,
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'x orient', ['bottom', 'top'], (v) => live.set({ xOrient: v as State['xOrient'] }));
      select(bar, 'y orient', ['left', 'right'], (v) => live.set({ yOrient: v as State['yOrient'] }));
      select(bar, 'x inverse', ['false', 'true'], (v) => live.set({ xInverse: bool(v) }));
      select(bar, 'y inverse', ['false', 'true'], (v) => live.set({ yInverse: bool(v) }));
    },
  });

export default mount;
