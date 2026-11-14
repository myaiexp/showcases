// The diverging color scale types: diverging, -log, -pow, -sqrt and -symlog
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const types = ['diverging', 'diverging-pow', 'diverging-sqrt', 'diverging-symlog', 'diverging-log'] as const;
type Type = (typeof types)[number];
const linear = d3.range(-40, 41);
const geometric = d3.range(-20, 21).map((i) => 10 ** (i / 10)); // 0.01 to 100, around the log pivot of 1

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { type: 'diverging' as Type },
    render: ({ type }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: { type, ...(type === 'diverging-pow' ? { exponent: 2 } : {}) },
        marks: [Plot.cell(type === 'diverging-log' ? geometric : linear, { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ type: types[i % types.length] }),
    previewMs: 1500,
    controls: (bar, live) => select(bar, 'color type ', types, live.state.type, (type) => live.set({ type })),
  });

export default mount;
