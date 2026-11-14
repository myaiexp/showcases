// A symlog scale across zero; constant sets the linear core
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const constants = [1, 0.2, 3, 8];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { constant: 1 },
    render: ({ constant }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { type: 'symlog', constant, domain: [-10, 10], grid: true },
        marks: [Plot.dot(d3.range(-10, 11), { x: Plot.identity })],
      }),
    step: (_s, i) => ({ constant: constants[i % constants.length] }),
    controls: (bar, live) => slider(bar, 'constant ', [0.1, 10, 0.1], live.state.constant, (constant) => live.set({ constant })),
  });

export default mount;
