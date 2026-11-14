// Callbacks instead of scales: size as a function of the datum, shape by a threshold
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { bubbles, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = bubbles(seeded(55), 36);

const mount: Mount = (el, ctx) =>
  mountLive<{ limit: number }>(el, ctx, {
    initial: { limit: 50 },
    build: ({ limit }) =>
      ({
        type: 'scatter',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        size: (d: Record<string, unknown>) => 3 * Math.sqrt(Number(d.size)),
        shape: (d: Record<string, unknown>) => (Number(d.size) > limit ? 'star' : 'circle'),
        point: { style: { fillOpacity: 0.7 } },
        axes: [
          { orient: 'bottom', type: 'linear', min: 0, max: 100 },
          { orient: 'left', type: 'linear', min: 0, max: 100 },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'star above size', [10, 100, 5], 50, (limit) => live.set({ limit }));
    },
    step: (_s, i) => ({ limit: [30, 50, 70, 90][i % 4] ?? 50 }),
    previewMs: 1300,
  });

export default mount;
