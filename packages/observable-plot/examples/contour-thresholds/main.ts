// Contour levels: a threshold count or a fixed interval
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { volcano } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const BY = ['thresholds', 'interval'] as const;
type By = (typeof BY)[number];

const mount: Mount = async (el, ctx) => {
  const v = await volcano();
  return mountPlot<{ by: By; count: number; step: number }>(el, ctx, {
    initial: { by: 'thresholds', count: 10, step: 10 },
    render: ({ by, count, step }, { width, height }) =>
      Plot.contour(v.values, {
        width: v.width,
        height: v.height,
        fill: Plot.identity,
        ...(by === 'thresholds' ? { thresholds: count } : { interval: step }),
      }).plot({ width, height }),
    step: (s, i) => (i % 2 ? { by: 'interval', step: [10, 20, 5][(i >> 1) % 3] } : { by: 'thresholds', count: [5, 10, 30][(i >> 1) % 3] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'levels by', BY, live.state.by, (by) => live.set({ by }));
      slider(bar, 'thresholds', [2, 40, 1], live.state.count, (count) => live.set({ count }));
      slider(bar, 'interval', [2, 40, 1], live.state.step, (step) => live.set({ step }));
    },
  });
};

export default mount;
