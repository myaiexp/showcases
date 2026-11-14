// delaunayLink edges coloured by a point property
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
      marks: [Plot.delaunayLink(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', stroke: 'body_mass_g', strokeWidth: 1.5 })],
    }),
  );
};

export default mount;
