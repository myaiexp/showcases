// A voronoiMesh of the penguin scatterplot
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
        Plot.voronoiMesh(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm' }),
        Plot.dot(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', fill: 'species' }),
      ],
    }),
  );
};

export default mount;
