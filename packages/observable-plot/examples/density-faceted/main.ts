// Density in facets, with one shared set of thresholds
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
        Plot.density(penguins, { fx: 'island', x: 'flipper_length_mm', y: 'culmen_length_mm', stroke: 'density', clip: true }),
        Plot.frame(),
      ],
    }),
  );
};

export default mount;
