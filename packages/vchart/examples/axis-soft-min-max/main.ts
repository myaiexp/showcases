// softMin and softMax: bounds that only take effect when the data lies inside them
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [52, 61, 45, 78, 66, 58, 71].map((v, i) => ({ d: `D${i + 1}`, v })); // min 45, max 78
interface State { softMin: number; softMax: number }
const SCENES: State[] = [{ softMin: 0, softMax: 100 }, { softMin: 30, softMax: 90 }, { softMin: 60, softMax: 70 }, { softMin: 10, softMax: 150 }];

const build = ({ softMin, softMax }: State): ISpec =>
  ({
    type: 'line',
    data: [{ values: data }],
    xField: 'd',
    yField: 'v',
    axes: [{ orient: 'left', softMin, softMax }, { orient: 'bottom', type: 'band' }],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: SCENES[0] ?? { softMin: 0, softMax: 100 },
    build,
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      slider(bar, 'softMin (data min is 45)', [0, 80, 5], 0, (v) => live.set({ softMin: v }));
      slider(bar, 'softMax (data max is 78)', [60, 200, 5], 100, (v) => live.set({ softMax: v }));
    },
  });

export default mount;
