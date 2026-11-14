// Color scale types that bin values: quantile, quantize and threshold (with n)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const types = ['linear', 'quantile', 'quantize', 'threshold'] as const;
type Type = (typeof types)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('gistemp.csv');
  const gistemp = ctx.preview ? thin(all, 2) : all;
  return mountPlot(el, ctx, {
    initial: { type: 'quantile' as Type, n: 5 },
    render: ({ type, n }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        legend: !preview,
        color: {
          type,
          scheme: 'BuRd',
          ...(type === 'threshold' ? { domain: [-0.5, -0.2, 0, 0.2, 0.5] } : {}),
          ...(type === 'quantile' || type === 'quantize' ? { n } : {}),
          ...(type === 'linear' ? {} : { legend: !preview }),
        },
        marks: [Plot.ruleX(gistemp, { x: 'Date', stroke: 'Anomaly' })],
      }),
    step: (_s, i) => ({ type: types[i % 4], n: [5, 3, 8, 5][i % 4] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'type ', types, live.state.type, (type) => live.set({ type }));
      slider(bar, 'n ', [2, 12, 1], live.state.n, (n) => live.set({ n }));
    },
  });
};

export default mount;
