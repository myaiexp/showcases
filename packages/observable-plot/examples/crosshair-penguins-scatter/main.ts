// A two-dimensional crosshair on a penguin scatterplot
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
        marks: [
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'sex' }),
          Plot.crosshair(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
        ],
      }),
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.5 + 0.3 * Math.sin(t * Math.PI * 4)], 5000) : undefined,
  });
};

export default mount;
