// A line through twenty random values, with a picker for every named curve
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = [
  'basis', 'basis-open', 'basis-closed', 'bump-x', 'bump-y', 'bundle', 'cardinal', 'cardinal-open', 'cardinal-closed',
  'catmull-rom', 'catmull-rom-open', 'catmull-rom-closed', 'linear', 'linear-closed', 'monotone-x', 'monotone-y',
  'natural', 'step', 'step-after', 'step-before',
] as const;
type CurveName = (typeof CURVES)[number];

const numbers = d3.range(20).map(d3.randomLcg(42));

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName }>(el, ctx, {
    initial: { curve: 'catmull-rom' },
    render: ({ curve }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? curve : undefined,
        marks: [Plot.lineY(numbers, { curve }), Plot.dotY(numbers, { x: (_d, i) => i })],
      }),
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
    },
  });

export default mount;
