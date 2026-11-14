// Text: with no x, y or text, data points become labelled by their index
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot<{ n: number }>(el, ctx, {
    initial: { n: 151 },
    render: ({ n }, { width, height }) =>
      Plot.plot({
        width,
        height,
        aspectRatio: 1,
        inset: 10,
        grid: true,
        // An array of [x, y] pairs is the shorthand; the text defaults to the index.
        marks: [Plot.text(d3.range(n).map((i) => [Math.sqrt(i) * Math.sin(i / 10), Math.sqrt(i) * Math.cos(i / 10)]))],
      }),
    step: (_s, i) => ({ n: [20, 60, 100, 151][i % 4] ?? 151 }),
    previewMs: 1500,
    controls: (bar, live) => {
      slider(bar, 'points', [5, 300, 1], live.state.n, (n) => live.set({ n }));
    },
  });

export default mount;
