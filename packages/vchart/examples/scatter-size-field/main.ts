// Bubble chart: sizeField mapped through a linear size scale
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { bubbles, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = bubbles(seeded(12), 30);

const mount: Mount = (el, ctx) =>
  mountLive<{ max: number }>(el, ctx, {
    initial: { max: 40 },
    build: ({ max }) =>
      ({
        type: 'scatter',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        sizeField: 'size',
        size: { type: 'linear', range: [4, max] },
        point: { style: { fillOpacity: 0.6 } },
        axes: [
          { orient: 'bottom', type: 'linear', min: 0, max: 100 },
          { orient: 'left', type: 'linear', min: 0, max: 100 },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'size.range max', [8, 70, 1], 40, (max) => live.set({ max }));
    },
    step: (_s, i) => ({ max: [20, 40, 60, 30][i % 4] ?? 40 }),
    previewMs: 1300,
  });

export default mount;
