// Histogram from raw values: the bin transform with a changing number of bins
// (The bin transform is registered by the histogram chart but missing from the BuildInTransformOptions types, hence the cast.)
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { sample, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const raw = sample(seeded(8), 300, 5, 3).map((value) => ({ value }));

const mount: Mount = (el, ctx) =>
  mountLive<{ bins: number }>(el, ctx, {
    initial: { bins: 10 },
    mode: 'rebuild',
    build: ({ bins }) =>
      ({
        type: 'histogram',
        data: [{ name: 'raw', transforms: [{ type: 'bin', options: { bins, field: 'value' } }], values: raw }],
        xField: 'x0',
        x2Field: 'x1',
        yField: 'count',
        bar: { style: { stroke: '#222', lineWidth: 1 } },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      slider(bar, 'bins', [3, 40, 1], 10, (bins) => live.set({ bins }));
    },
    step: (_s, i) => ({ bins: [6, 12, 20, 30, 10][i % 5] ?? 10 }),
    previewMs: 1400,
  });

export default mount;
