// Density of 54k diamonds, stroke coloured by the density keyword
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('diamonds.csv');
  const diamonds = ctx.preview ? thin(all, 20) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      inset: 10,
      grid: true,
      x: { type: 'log' },
      y: { type: 'log' },
      marks: [Plot.density(diamonds, { x: 'carat', y: 'price', stroke: 'density' })],
    }),
  );
};

export default mount;
