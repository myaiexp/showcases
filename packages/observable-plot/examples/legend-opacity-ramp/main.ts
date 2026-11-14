// An opacity scale gets its own ramp legend: body mass as dot opacity
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height && height - 62, // leaves room for the legend in a card
      grid: true,
      opacity: { legend: true, label: 'Body mass (g)' },
      marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'currentColor', fillOpacity: 'body_mass_g', r: 4 })],
    }),
  );
};

export default mount;
