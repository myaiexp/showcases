// A raster from f(x, y) = atan2(y, x), plus two other functions to try
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const fns = {
  'atan2(y, x)': (x: number, y: number) => Math.atan2(y, x),
  'distance from origin': (x: number, y: number) => Math.hypot(x, y),
  'sin(5x) * cos(5y)': (x: number, y: number) => Math.sin(5 * x) * Math.cos(5 * y),
} as const;
const names = Object.keys(fns) as (keyof typeof fns)[];

const mount: Mount = (el, ctx) =>
  mountPlot<{ fn: keyof typeof fns }>(el, ctx, {
    initial: { fn: 'atan2(y, x)' },
    render: ({ fn }, { width, height, preview }) =>
      Plot.raster({ x1: -1, x2: 1, y1: -1, y2: 1, fill: fns[fn], pixelSize: preview ? 3 : 1 }).plot({ width, height }),
    step: ({ fn }) => ({ fn: names[(names.indexOf(fn) + 1) % names.length] ?? 'atan2(y, x)' }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'fill: (x, y) =>', names, live.state.fn, (fn) => live.set({ fn }));
    },
  });

export default mount;
