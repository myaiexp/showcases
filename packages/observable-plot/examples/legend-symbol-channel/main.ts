// A symbol scale used with color: the symbol legend carries both encodings
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
      x: { label: 'Body mass (g)' },
      y: { label: 'Flipper length (mm)' },
      symbol: { legend: true },
      marks: [Plot.dot(penguins, { x: 'body_mass_g', y: 'flipper_length_mm', stroke: 'species', symbol: 'species' })],
    }),
  );
};

export default mount;
