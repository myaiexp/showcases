// Downsampling a long line: sampling and samplingFactor
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(90);
let v = 50;
const values = Array.from({ length: 3000 }, (_, x) => ({ x, y: (v += (rand() - 0.5) * 6) + Math.sin(x / 60) * 12 }));
const METHODS = ['lttb', 'min', 'max', 'average', 'sum'];

const mount: Mount = (el, ctx) =>
  mountLive<{ method: string; factor: number }>(el, ctx, {
    initial: { method: 'lttb', factor: 1 },
    mode: 'rebuild',
    build: ({ method, factor }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        point: { visible: false },
        sampling: method,
        samplingFactor: factor,
        axes: [
          { orient: 'bottom', type: 'linear' },
          { orient: 'left', type: 'linear' },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'sampling', METHODS, (method) => live.set({ method }));
      slider(bar, 'samplingFactor', [0.2, 4, 0.2], 1, (factor) => live.set({ factor }));
    },
    step: (_s, i) => ({ method: METHODS[i % METHODS.length] ?? 'lttb' }),
    previewMs: 1500,
  });

export default mount;
