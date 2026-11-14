// Voronoi and voronoiMesh with only an x channel
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
        Plot.voronoi(penguins, { x: 'body_mass_g', fill: 'species' }),
        Plot.voronoiMesh(penguins, { x: 'body_mass_g', stroke: 'white', strokeOpacity: 1 }),
      ],
    }),
  );
};

export default mount;
