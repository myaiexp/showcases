// dodgeY respects the dot radius r: slide it and the piles grow
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 3 },
    render: ({ r }, { width, height }) =>
      Plot.plot({ width, height: height ?? 180, marks: [Plot.dot(cars, Plot.dodgeY({ x: 'weight (lb)', r, fill: 'currentColor' }))] }),
    step: (_s, i) => ({ r: [1, 1.5, 2.5, 1.8][i % 4] ?? 2 }),
    previewMs: 1800,
    controls: (bar, live) => slider(bar, 'radius (r)', [0.5, 10, 0.1], live.state.r, (r) => live.set({ r })),
  });
};

export default mount;
