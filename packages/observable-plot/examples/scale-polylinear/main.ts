// A piecewise linear domain with more than two values
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { piecewise: true, knee: 20 },
    render: ({ piecewise, knee }, { width, height }) => {
      const domain = piecewise ? [0, knee, 100] : [0, 100];
      return Plot.plot({
        width,
        height,
        // a domain with three values needs an explicit continuous type, and explicit ticks
        x: { type: 'linear', domain, ticks: domain, grid: true },
        marks: [Plot.dot(d3.range(0, 101, 5), { x: Plot.identity })],
      });
    },
    step: (_s, i) => ({ piecewise: i % 4 !== 3, knee: [20, 50, 80][i % 3] }),
    previewMs: 1800,
    controls: (bar, live) => {
      toggle(bar, 'piecewise domain ', live.state.piecewise, (piecewise) => live.set({ piecewise }));
      slider(bar, 'middle value ', [5, 95, 1], live.state.knee, (knee) => live.set({ knee }));
    },
  });

export default mount;
