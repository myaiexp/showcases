// The opacity scale maps values to fill-opacity
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { min: 0 },
    render: ({ min }, { width, height }) =>
      Plot.plot({
        width,
        height,
        opacity: { range: [min, 1] },
        marks: [Plot.dot(d3.range(1, 11), { x: Plot.identity, r: 12, fill: 'currentColor', fillOpacity: Plot.identity })],
      }),
    step: (_s, i) => ({ min: [0, 0.4, 0.8][i % 3] }),
    controls: (bar, live) => slider(bar, 'range start ', [0, 1, 0.01], live.state.min, (min) => live.set({ min })),
  });

export default mount;
