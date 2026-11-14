// Axis range: min and max pin the ends of a linear axis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [64, 92, 71, 118, 105, 140, 87, 126].map((v, i) => ({ t: `T${i + 1}`, v }));
interface State { min: number; max: number }
const RANGES: State[] = [{ min: 0, max: 200 }, { min: 60, max: 150 }, { min: 80, max: 130 }, { min: 0, max: 400 }];

const build = ({ min, max }: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 't',
    yField: 'v',
    axes: [{ orient: 'left', min, max }, { orient: 'bottom', type: 'band' }],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: RANGES[0] ?? { min: 0, max: 200 },
    build,
    step: (_s, i) => RANGES[i % RANGES.length] ?? {},
    controls: (bar, live) => {
      slider(bar, 'min', [0, 100, 5], 0, (v) => live.set({ min: v }));
      slider(bar, 'max', [110, 400, 10], 200, (v) => live.set({ max: v }));
    },
  });

export default mount;
