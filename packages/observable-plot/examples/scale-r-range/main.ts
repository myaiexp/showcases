// The r scale is sqrt by default; an explicit range sets the largest dot radius
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { explicit: true, radius: 8 },
    render: ({ explicit, radius }, { width, height }) =>
      Plot.plot({
        width,
        height,
        r: explicit ? { range: [0, radius] } : {},
        marks: [Plot.dot(d3.range(1, 11), { x: Plot.identity, r: Plot.identity, fill: 'currentColor' })],
      }),
    step: (_s, i) => ({ explicit: i % 5 !== 4, radius: [8, 3, 14, 20][i % 4] }),
    previewMs: 1400,
    controls: (bar, live) => {
      toggle(bar, 'explicit range ', live.state.explicit, (explicit) => live.set({ explicit }));
      slider(bar, 'radius ', [1, 20, 0.1], live.state.radius, (radius) => live.set({ radius }));
    },
  });

export default mount;
