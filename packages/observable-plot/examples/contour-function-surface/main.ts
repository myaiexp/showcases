// Contour of f(x, y) with no data, evaluated per pixel centre
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) =>
  mountPlot<{ kx: number; ky: number }>(el, ctx, {
    initial: { kx: 1, ky: 1 },
    render: ({ kx, ky }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        aspectRatio: 1,
        x: { tickSpacing: 80, label: 'x' },
        y: { tickSpacing: 80, label: 'y' },
        color: { type: 'diverging', legend: !preview, label: 'sin(x) cos(y)' },
        marks: [
          Plot.contour({
            fill: (x: number, y: number) => Math.sin(kx * x) * Math.cos(ky * y),
            x1: 0,
            y1: 0,
            x2: 6 * Math.PI,
            y2: 4 * Math.PI,
          }),
        ],
      }),
    // A card re-evaluates the grid every few seconds, never faster.
    step: (_s, i) => ({ kx: 1 + (i % 3), ky: 1 + ((i >> 1) % 3) }),
    previewMs: 3200,
    controls: (bar, live) => {
      slider(bar, 'x frequency', [0.5, 4, 0.5], live.state.kx, (kx) => live.set({ kx }));
      slider(bar, 'y frequency', [0.5, 4, 0.5], live.state.ky, (ky) => live.set({ ky }));
    },
  });

export default mount;
