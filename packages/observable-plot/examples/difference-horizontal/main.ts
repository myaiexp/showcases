// differenceX: the anomaly along x, time along y
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<{ positive: number; negative: number }>(el, ctx, {
    initial: { positive: 1, negative: 1 },
    render: ({ positive, negative }, { width, height }) =>
      Plot.differenceX(gistemp, {
        y: 'Date',
        x: 'Anomaly',
        positiveFill: 'red',
        negativeFill: 'blue',
        positiveFillOpacity: positive,
        negativeFillOpacity: negative,
      }).plot({ width, height, x: { grid: true } }),
    step: (_s, i) => ({ positive: [1, 0.3, 1][i % 3], negative: [1, 1, 0.3][i % 3] }),
    previewMs: 2400,
    controls: (bar, live) => {
      slider(bar, 'positiveFillOpacity', [0, 1, 0.05], live.state.positive, (positive) => live.set({ positive }));
      slider(bar, 'negativeFillOpacity', [0, 1, 0.05], live.state.negative, (negative) => live.set({ negative }));
    },
  });
};

export default mount;
