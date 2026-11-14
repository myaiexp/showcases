// Voronoi cells behind a scatterplot, coloured by species
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      color: { legend: !preview },
      marks: [
        Plot.voronoi(penguins, {
          x: 'culmen_depth_mm',
          y: 'culmen_length_mm',
          fill: 'species',
          fillOpacity: 0.2,
          stroke: 'var(--plot-background)',
        }),
        Plot.frame(),
        Plot.dot(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', fill: 'species' }),
      ],
    }),
  );
};

export default mount;
