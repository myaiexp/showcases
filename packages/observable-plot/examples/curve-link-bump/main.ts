// The link mark with a curve: straight, bump-x, bump-y or a spline
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = ['linear', 'bump-x', 'bump-y', 'cardinal', 'catmull-rom', 'natural', 'step'] as const;
type CurveName = (typeof CURVES)[number];

// Eight sources on the left, each linked to a shuffled target on the right.
const rnd = d3.randomLcg(5);
const targets = d3.shuffler(rnd)(d3.range(8));
const links = d3.range(8).map((i) => ({ x1: 0, y1: i, x2: 1, y2: targets[i] }));

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName }>(el, ctx, {
    initial: { curve: 'bump-x' },
    render: ({ curve }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? curve : undefined,
        axis: null,
        inset: 10,
        marks: [
          Plot.link(links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', curve, stroke: 'y1', strokeWidth: 2 }),
          Plot.dot(links, { x: 'x1', y: 'y1', fill: 'y1' }),
          Plot.dot(links, { x: 'x2', y: 'y2', fill: 'y1' }),
        ],
      }),
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
    },
  });

export default mount;
