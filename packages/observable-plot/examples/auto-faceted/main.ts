// Facets on the auto mark: fx and fy split penguins by island and species
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    // The facet channels go in the auto options; global options go in .plot().
    Plot.auto(penguins, { x: 'body_mass_g', y: 'culmen_length_mm', fx: 'island', fy: 'species' }).plot({
      width,
      height,
      grid: true,
      x: { ticks: preview ? 2 : 5 },
      marginRight: preview ? 56 : 70,
    }),
  );
};

export default mount;
