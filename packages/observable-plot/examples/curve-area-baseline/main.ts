// An area with a curve option, outlined by a line with the same curve
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// bundle is for lines only, so it is left out of the area's choices.
const CURVES = [
  'linear', 'basis', 'basis-open', 'bump-x', 'cardinal', 'catmull-rom', 'monotone-x', 'natural', 'step', 'step-after', 'step-before',
] as const;
type CurveName = (typeof CURVES)[number];

const numbers = d3.range(16).map(d3.randomLcg(3));

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName }>(el, ctx, {
    initial: { curve: 'monotone-x' },
    render: ({ curve }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? curve : undefined,
        y: { grid: true },
        marks: [
          Plot.areaY(numbers, { x: (_d, i) => i, y: (d) => d, curve, fillOpacity: 0.3 }),
          Plot.lineY(numbers, { x: (_d, i) => i, curve }),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
    },
  });

export default mount;
