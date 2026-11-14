// On a non-linear curve markers sit on the path, not on the data points
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = ['linear', 'basis', 'cardinal', 'monotone-x', 'step', 'bump-x'] as const;
type CurveName = (typeof CURVES)[number];

const numbers = d3.range(12).map(d3.randomLcg(9));

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName }>(el, ctx, {
    initial: { curve: 'basis' },
    render: ({ curve }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `curve: ${curve}` : undefined,
        marks: [
          Plot.lineY(numbers, { curve, stroke: 'orange', strokeWidth: 2, marker: 'circle-stroke' }),
          // The data, for comparison: a dot mark always sits at the given x and y.
          Plot.dotY(numbers, { x: (_d, i) => i, symbol: 'plus', stroke: 'currentColor', r: 4 }),
        ],
      }),
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
    },
  });

export default mount;
