// Stacked bars: stackCornerRadius rounds the outside of the whole stack
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = grouped(seeded(44), ['A', 'B', 'C', 'D', 'E'], ['one', 'two', 'three'], 10, 40);

const mount: Mount = (el, ctx) =>
  mountLive<{ r: number }>(el, ctx, {
    initial: { r: 12 },
    build: ({ r }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: 'cat',
        yField: 'value',
        seriesField: 'group',
        stack: true,
        stackCornerRadius: r,
        legends: { visible: !ctx.preview },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'stackCornerRadius', [0, 30, 1], 12, (r) => live.set({ r }));
    },
    step: (_s, i) => ({ r: [0, 8, 16, 28, 12][i % 5] ?? 0 }),
    previewMs: 1300,
  });

export default mount;
