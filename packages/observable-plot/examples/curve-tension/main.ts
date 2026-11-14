// The tension option on bundle, cardinal and Catmull-Rom curves
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = ['bundle', 'cardinal', 'cardinal-open', 'cardinal-closed', 'catmull-rom', 'catmull-rom-open', 'catmull-rom-closed'] as const;
type CurveName = (typeof CURVES)[number];

const numbers = d3.range(12).map(d3.randomLcg(7));

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName; tension: number }>(el, ctx, {
    initial: { curve: 'cardinal', tension: 0 },
    render: ({ curve, tension }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `${curve}, tension ${tension.toFixed(2)}` : undefined,
        marks: [
          Plot.lineY(numbers, { curve: 'linear', strokeOpacity: 0.3, strokeDasharray: '3,3' }),
          Plot.lineY(numbers, { curve, tension, stroke: 'orange', strokeWidth: 2 }),
          Plot.dotY(numbers, { x: (_d, i) => i }),
        ],
      }),
    // The card sweeps tension 0 to 1 on a cardinal spline.
    step: (_s, i) => ({ tension: (i % 11) / 10 }),
    previewMs: 500,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
      slider(bar, 'tension', [0, 1, 0.05], live.state.tension, (tension) => live.set({ tension }));
    },
  });

export default mount;
