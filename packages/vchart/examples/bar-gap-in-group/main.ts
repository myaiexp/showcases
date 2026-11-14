// Grouped bars: barGapInGroup sets the spacing inside a group
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = grouped(seeded(17), ['A', 'B', 'C', 'D'], ['x', 'y', 'z']);

const mount: Mount = (el, ctx) =>
  mountLive<{ gap: number }>(el, ctx, {
    initial: { gap: 0 },
    build: ({ gap }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: ['cat', 'group'],
        yField: 'value',
        seriesField: 'group',
        barGapInGroup: gap,
        legends: { visible: false },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'barGapInGroup', [0, 30, 1], 0, (gap) => live.set({ gap }));
    },
    step: (_s, i) => ({ gap: [0, 8, 16, 24, 12][i % 5] ?? 0 }),
    previewMs: 1300,
  });

export default mount;
