// Mandelbrot set: the raster fill is a function of x and y, sampled at each pixel
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// Iterations until the point escapes; undefined (no colour) if it never does.
function mandelbrot(x: number, y: number): number | undefined {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
  return undefined;
}

// Each view keeps the 3 : 2.328 shape of the full set.
const views = {
  'whole set': { x1: -2, x2: 1, y1: -1.164, y2: 1.164 },
  'seahorse valley': { x1: -0.85, x2: -0.55, y1: -0.0164, y2: 0.2164 },
  'main bulb edge': { x1: -0.4, x2: 0.2, y1: 0.4656, y2: 0.9312 },
} as const;
const names = Object.keys(views) as (keyof typeof views)[];

const mount: Mount = (el, ctx) =>
  mountPlot<{ view: keyof typeof views }>(el, ctx, {
    initial: { view: 'whole set' },
    render: ({ view }, { width, height, preview }) =>
      Plot.raster({ fill: mandelbrot, ...views[view], pixelSize: preview ? 3 : 1 }).plot({
        width,
        height,
        aspectRatio: 1,
        color: { legend: !preview },
      }),
    step: ({ view }) => ({ view: names[(names.indexOf(view) + 1) % names.length] ?? 'whole set' }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'view', names, live.state.view, (view) => live.set({ view }));
    },
  });

export default mount;
