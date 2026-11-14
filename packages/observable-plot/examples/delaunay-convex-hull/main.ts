// Convex hull of each species, under the penguin dots
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [
        Plot.hull(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', fill: 'species', fillOpacity: 0.2 }),
        Plot.dot(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', stroke: 'species' }),
      ],
    }),
  );
};

export default mount;
