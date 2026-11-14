// Sub ticks and grids: tick.tickSize, subTick.tickCount, grid and subGrid styles
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [12, 34, 29, 51, 44, 63, 58].map((v, i) => ({ k: `K${i + 1}`, v }));
interface State { sub: boolean; subCount: number; tickSize: number; dashed: boolean; subGrid: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      {
        orient: 'left',
        tick: { visible: true, tickSize: s.tickSize },
        subTick: { visible: s.sub, tickCount: s.subCount, tickSize: 3 },
        grid: { visible: true, style: { lineDash: s.dashed ? [4, 4] : [] } },
        subGrid: { visible: s.subGrid, style: { lineDash: [2, 3], strokeOpacity: 0.5 } },
      },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const SCENES: Partial<State>[] = [
  { sub: true, subCount: 4, dashed: false, subGrid: true },
  { sub: true, subCount: 1, dashed: true, subGrid: true },
  { sub: true, subCount: 8, dashed: true, subGrid: false },
  { sub: false, subCount: 4, dashed: false, subGrid: false },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { sub: true, subCount: 4, tickSize: 6, dashed: false, subGrid: true },
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      slider(bar, 'tickSize', [0, 16, 1], 6, (v) => live.set({ tickSize: v }));
      select(bar, 'subTick', ['true', 'false'], (v) => live.set({ sub: v === 'true' }));
      slider(bar, 'subTick.tickCount', [1, 9, 1], 4, (v) => live.set({ subCount: v }));
      select(bar, 'grid dashed', ['false', 'true'], (v) => live.set({ dashed: v === 'true' }));
      select(bar, 'subGrid', ['true', 'false'], (v) => live.set({ subGrid: v === 'true' }));
    },
  });

export default mount;
