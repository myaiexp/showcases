// A one-dimensional crosshair over ticks of penguin body mass
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.tickX(penguins, { x: 'body_mass_g' }), Plot.crosshairX(penguins, { x: 'body_mass_g' })],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 5000) : undefined),
  });
};

export default mount;
