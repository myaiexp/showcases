// Axis label sampling: sampling and label.minGap on a band axis with eighty categories
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(41);
const data = Array.from({ length: 80 }, (_, i) => ({ x: `${(i / 2).toFixed(1)}`, y: Math.round(10 + rand() * 80) }));
interface State { sampling: boolean; minGap: number }
const SCENES: State[] = [{ sampling: true, minGap: 4 }, { sampling: true, minGap: 30 }, { sampling: true, minGap: 60 }, { sampling: false, minGap: 4 }];

const build = ({ sampling, minGap }: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'x',
    yField: 'y',
    axes: [{ orient: 'bottom', sampling, label: { minGap } }, { orient: 'left' }],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: SCENES[0] ?? { sampling: true, minGap: 4 },
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'sampling', ['true', 'false'], (v) => live.set({ sampling: v === 'true' }));
      slider(bar, 'label.minGap', [0, 80, 2], 4, (v) => live.set({ minGap: v }));
    },
  });

export default mount;
