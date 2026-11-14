// Minimum bar height: barMinHeight keeps very small values visible
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = [900, 1, 640, 2, 380, 0.5, 760].map((value, i) => ({ item: `Item ${i + 1}`, value }));

const mount: Mount = (el, ctx) =>
  mountLive<{ min: number }>(el, ctx, {
    initial: { min: 0 },
    build: ({ min }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: 'item',
        yField: 'value',
        barMinHeight: min,
        label: { visible: !ctx.preview },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'barMinHeight', [0, 40, 1], 0, (min) => live.set({ min }));
    },
    step: (_s, i) => ({ min: i % 2 ? 0 : 24 }),
    previewMs: 1500,
  });

export default mount;
