// Penguin body mass as beeswarms in facets: dodgeX with fx species, fill sex
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
      y: { grid: true },
      color: { legend: !preview },
      marks: [
        // dodgeX("middle") builds x around the facet centre from the y values; fx splits species.
        Plot.dot(penguins, Plot.dodgeX('middle', { fx: 'species', y: 'body_mass_g', fill: 'sex', r: preview ? 1.8 : undefined })),
      ],
    }),
  );
};

export default mount;
