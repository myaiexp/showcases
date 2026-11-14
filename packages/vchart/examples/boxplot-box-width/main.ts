// Box plot widths: boxWidth, shaftWidth and lineWidth on the boxPlot mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = boxRows(seeded(21), ['A', 'B', 'C', 'D', 'E']);

const mount: Mount = (el, ctx) =>
  mountLive<{ box: number; shaft: number }>(el, ctx, {
    initial: { box: 20, shaft: 20 },
    build: ({ box, shaft }) =>
      ({
        type: 'boxPlot',
        data: [{ id: 'data', values }],
        xField: 'x',
        minField: 'min',
        q1Field: 'q1',
        medianField: 'median',
        q3Field: 'q3',
        maxField: 'max',
        boxPlot: { style: { boxWidth: box, shaftWidth: shaft, lineWidth: 2 } },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'boxWidth', [8, 80, 2], 20, (box) => live.set({ box }));
      slider(bar, 'shaftWidth', [4, 80, 2], 20, (shaft) => live.set({ shaft }));
    },
    step: (_s, i) => ({ box: [14, 36, 60, 24][i % 4] ?? 20, shaft: [30, 14, 50, 20][i % 4] ?? 20 }),
    previewMs: 1300,
  });

export default mount;
