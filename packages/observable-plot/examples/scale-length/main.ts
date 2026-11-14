// The length scale sizes vectors; range sets the longest arrow in pixels
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const points = d3.cross(d3.range(1, 9), d3.range(1, 5)).map(([x, y]) => ({ x, y, speed: x * y }));

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { max: 30 },
    render: ({ max }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 20,
        grid: true,
        length: { range: [0, max] },
        marks: [Plot.vector(points, { x: 'x', y: 'y', length: 'speed', rotate: 90, stroke: 'speed' })],
      }),
    step: (_s, i) => ({ max: [30, 12, 50][i % 3] }),
    controls: (bar, live) => slider(bar, 'longest vector (px) ', [5, 80, 1], live.state.max, (max) => live.set({ max })),
  });

export default mount;
