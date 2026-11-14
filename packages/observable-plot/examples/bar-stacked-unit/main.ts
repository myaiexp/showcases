// A unit chart: a bar per penguin, stacked by species, colored by mass
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
      marginLeft: 60,
      x: { label: 'Frequency' },
      y: { label: null },
      color: { legend: !preview },
      marks: [
        // x: 1 gives each penguin a unit-width bar; the implicit stackX lines them up.
        Plot.barX(penguins, { y: 'species', x: 1, inset: 0.5, fill: 'body_mass_g', sort: 'body_mass_g' }),
        Plot.ruleX([0]),
      ],
    }),
  );
};

export default mount;
