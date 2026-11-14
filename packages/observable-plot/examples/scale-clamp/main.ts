// clamp: true pins values outside a fixed x domain to its edges
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { clamp: false },
    render: ({ clamp }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 10,
        x: { domain: [20, 80], clamp, grid: true },
        marks: [Plot.frame(), Plot.dot(d3.range(0, 101, 5), { x: Plot.identity, fill: (d: number) => (d < 20 || d > 80 ? 'orange' : 'currentColor') })],
      }),
    step: ({ clamp }) => ({ clamp: !clamp }),
    controls: (bar, live) => toggle(bar, 'clamp ', live.state.clamp, (clamp) => live.set({ clamp })),
  });

export default mount;
