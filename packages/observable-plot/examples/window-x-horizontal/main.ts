// windowX smoothing a horizontal line of temperature anomaly
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hadcrut } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const data = await hadcrut();
  return mountPlot<{ k: number }>(el, ctx, {
    initial: { k: 24 },
    render: ({ k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { grid: true, label: 'Anomaly (°C)' },
        y: { label: 'Year', tickFormat: String },
        marks: [
          Plot.lineX(data, { x: 'anomaly', y: 'year', strokeOpacity: 0.3 }),
          Plot.lineX(data, Plot.windowX(k, { y: 'year', x: 'anomaly' })),
        ],
      }),
    step: (_s, i) => ({ k: [24, 5, 60, 12][i % 4] ?? 24 }),
    previewMs: 2000,
    controls: (bar, live) => {
      slider(bar, 'window size k', [1, 80, 1], live.state.k, (k) => live.set({ k }));
    },
  });
};

export default mount;
