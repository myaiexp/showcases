// A curve given as a function: d3 factories and a hand-written elbow curve
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// A custom curve factory in the shape d3 documents: called with the path context, it
// returns an object that receives lineStart, point and lineEnd. This one runs
// vertically first and then horizontally into each point.
const elbow: d3.CurveFactory = (context) => {
  let first = true;
  let x0 = 0;
  return {
    areaStart() {},
    areaEnd() {},
    lineStart() {
      first = true;
    },
    lineEnd() {},
    point(x, y) {
      if (first) context.moveTo(x, y);
      else {
        context.lineTo(x0, y);
        context.lineTo(x, y);
      }
      first = false;
      x0 = x;
    },
  };
};

const FACTORIES: Record<string, d3.CurveFactory> = {
  'd3.curveBasis': d3.curveBasis,
  'd3.curveCardinal.tension(0.8)': d3.curveCardinal.tension(0.8),
  'd3.curveCatmullRom.alpha(0.2)': d3.curveCatmullRom.alpha(0.2),
  'd3.curveMonotoneX': d3.curveMonotoneX,
  'd3.curveStepAfter': d3.curveStepAfter,
  'custom elbow function': elbow,
};
const NAMES = Object.keys(FACTORIES);

const numbers = d3.range(14).map(d3.randomLcg(21));

const mount: Mount = (el, ctx) =>
  mountPlot<{ name: string }>(el, ctx, {
    initial: { name: 'custom elbow function' },
    render: ({ name }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? name : undefined,
        marks: [Plot.lineY(numbers, { curve: FACTORIES[name], stroke: 'orange', strokeWidth: 2 }), Plot.dotY(numbers, { x: (_d, i) => i })],
      }),
    step: (_s, i) => ({ name: NAMES[i % NAMES.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'curve function', NAMES, live.state.name, (name) => live.set({ name }));
    },
  });

export default mount;
