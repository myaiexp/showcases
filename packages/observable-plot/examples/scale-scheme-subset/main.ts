// Keep part of a continuous scheme by giving the color range a subset of [0, 1]
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const schemes = ['rainbow', 'turbo', 'viridis', 'blues', 'sinebow'] as Plot.ColorScheme[];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { scheme: 'rainbow' as Plot.ColorScheme, lo: 0, hi: 0.5 },
    render: ({ scheme, lo, hi }, { width, height }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        padding: 0,
        color: { scheme, range: [lo, hi] },
        marks: [Plot.cell(d3.range(40), { x: Plot.identity, fill: Plot.identity, inset: -0.5 })],
      }),
    step: (_s, i) => ({ lo: 0, hi: [0.5, 1, 0.25, 0.75][i % 4] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'scheme ', schemes, live.state.scheme, (scheme) => live.set({ scheme }));
      slider(bar, 'range start ', [0, 1, 0.01], live.state.lo, (lo) => live.set({ lo }));
      slider(bar, 'range end ', [0, 1, 0.01], live.state.hi, (hi) => live.set({ hi }));
    },
  });

export default mount;
