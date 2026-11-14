// Identity scales pass literal colors and pixel positions through
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const dots = ['crimson', 'goldenrod', 'seagreen', 'steelblue', 'orchid'].map((color, i) => ({ color, px: 30 + i * 40 }));

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { color: true, position: true },
    render: ({ color, position }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        color: color ? { type: 'identity' } : {},
        x: position ? { type: 'identity' } : {},
        marks: [Plot.dot(dots, { x: 'px', fill: 'color', r: 12 })],
      }),
    step: (_s, i) => ({ color: i % 4 < 2, position: i % 4 !== 1 && i % 4 !== 2 }),
    controls: (bar, live) => {
      toggle(bar, 'color: identity ', live.state.color, (color) => live.set({ color }));
      toggle(bar, 'x: identity ', live.state.position, (position) => live.set({ position }));
    },
  });

export default mount;
