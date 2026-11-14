// An axis over a gray strip, its tick labels outlined with textStroke
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot<{ width: number; opacity: number }>(el, ctx, {
    initial: { width: 3, opacity: 0.6 },
    render: ({ width: textStrokeWidth, opacity }, { width }) =>
      Plot.plot({
        width,
        height: 40,
        style: 'background: #777;',
        x: { domain: [0, 100] },
        marks: [
          Plot.axisX({
            fill: 'black',
            stroke: 'white',
            textStroke: 'white',
            textStrokeWidth,
            textStrokeOpacity: opacity,
          }),
        ],
      }),
    step: (_s, i) => ({ width: [3, 6, 1, 4][i % 4], opacity: [0.6, 1, 0.3, 0.8][i % 4] }),
    previewMs: 1600,
    controls: (bar, live) => {
      slider(bar, 'textStrokeWidth', [0, 8, 0.5], 3, (width) => live.set({ width }));
      slider(bar, 'textStrokeOpacity', [0, 1, 0.1], 0.6, (opacity) => live.set({ opacity }));
    },
  });

export default mount;
