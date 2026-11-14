// Negative weights push each species' density region away from the others
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  const species = d3.groups(penguins, (d) => d.species).map(([s]) => s as string);
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      inset: 10,
      color: { legend: !preview },
      marks: [
        species.map((s) =>
          Plot.density(penguins, {
            x: 'flipper_length_mm',
            y: 'culmen_length_mm',
            weight: (d) => (d.species === s ? 1 : -1),
            fill: () => s,
            fillOpacity: 0.2,
            thresholds: [0.05],
          }),
        ),
        Plot.dot(penguins, { x: 'flipper_length_mm', y: 'culmen_length_mm', stroke: 'species' }),
        Plot.frame(),
      ],
    }),
  );
};

export default mount;
