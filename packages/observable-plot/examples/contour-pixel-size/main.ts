// Contour of the Mandelbrot escape count at a chosen pixelSize
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// Escape time of z -> z^2 + c, capped at 80 iterations.
function mandelbrot(x: number, y: number): number {
  let zr = 0;
  let zi = 0;
  for (let n = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
  return 80;
}

const mount: Mount = async (el, ctx) =>
  mountPlot<{ pixelSize: number }>(el, ctx, {
    initial: { pixelSize: ctx.preview ? 4 : 2 },
    render: ({ pixelSize }, { width, height }) =>
      Plot.contour({
        fill: mandelbrot,
        x1: -2.2,
        x2: 0.8,
        y1: -1.2,
        y2: 1.2,
        pixelSize,
        thresholds: 12,
      }).plot({ width, height, aspectRatio: 1, color: { scheme: 'Magma' }, x: { label: 're' }, y: { label: 'im' } }),
    step: (_s, i) => ({ pixelSize: [8, 4, 6][i % 3] }),
    previewMs: 3200,
    controls: (bar, live) => {
      slider(bar, 'pixelSize', [1, 10, 1], live.state.pixelSize, (pixelSize) => live.set({ pixelSize }));
    },
  });

export default mount;
