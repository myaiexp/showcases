// A non-faceted mark repeats in every facet: all penguins as gray context
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
      grid: true,
      marginRight: 60,
      facet: { label: null },
      marks: [
        Plot.frame(),
        // No fx or fy here, so every facet draws the whole population.
        Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: '#aaa', r: 1 }),
        Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species' }),
      ],
    }),
  );
};

export default mount;
