// A map of penguin species: random-walk interpolation of a categorical fill
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
        Plot.raster(penguins, {
          x: 'culmen_length_mm',
          y: 'culmen_depth_mm',
          fill: 'species',
          interpolate: 'random-walk',
          pixelSize: preview ? 4 : 2,
        }),
        Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
      ],
    }),
  );
};

export default mount;
