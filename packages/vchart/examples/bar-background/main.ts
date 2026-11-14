// Bar background tracks: barBackground visible, per bar or per group through fieldLevel
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = grouped(seeded(4), ['Mon', 'Tue', 'Wed', 'Thu'], ['a', 'b'], 20, 90);
const LEVELS = ['each bar', 'group (fieldLevel 0)'];

const mount: Mount = (el, ctx) =>
  mountLive<{ level: string }>(el, ctx, {
    initial: { level: LEVELS[0] ?? '' },
    mode: 'rebuild',
    build: ({ level }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: ['cat', 'group'],
        yField: 'value',
        seriesField: 'group',
        axes: [{ orient: 'left', max: 100 }],
        barBackground: {
          visible: true,
          ...(level === LEVELS[1] ? { fieldLevel: 0 } : {}),
          style: { fill: 'rgba(255,255,255,0.12)', cornerRadius: 4 },
        },
        bar: { style: { cornerRadius: 4 } },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'track', LEVELS, (level) => live.set({ level }));
    },
    step: (_s, i) => ({ level: LEVELS[i % 2] ?? '' }),
  });

export default mount;
