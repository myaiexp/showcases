// A Perlin noise field: Poisson-disk points, rotate and length from noise
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { octave, perlin2, poisson } from './noise.ts';

const noise = octave(perlin2, 2);

const mount: Mount = (el, ctx) => {
  // The point set is cached per count: a slider move should not resample every frame.
  const fields = new Map<number, [number, number][]>();
  const field = (n: number): [number, number][] => {
    let points = fields.get(n);
    if (!points) fields.set(n, (points = [...poisson([0, 0, 2, 2], n)]));
    return points;
  };
  return mountPlot(el, ctx, {
    initial: { n: ctx.preview ? 600 : 4000, shift: 0 },
    render: ({ n, shift }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 6,
        aspectRatio: height ? undefined : 1,
        axis: null,
        marks: [
          Plot.vector(field(n), {
            length: ([x, y]) => (noise(x + 2, y + shift) + 0.5) * 24,
            rotate: ([x, y]) => noise(x, y + shift) * 360,
          }),
        ],
      }),
    // Sliding the sample window through the noise makes the field flow in a card.
    step: ({ shift }) => ({ shift: shift + 0.12 }),
    previewMs: 450,
    controls: (bar, live) => {
      slider(bar, 'points', [500, 6000, 250], live.state.n, (n) => live.set({ n }));
      slider(bar, 'drift', [0, 4, 0.05], live.state.shift, (shift) => live.set({ shift }));
    },
  });
};

export default mount;
