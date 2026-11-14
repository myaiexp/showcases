// A crosshair mark: a rule and axis labels follow the nearest athlete
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 6) : all;
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(olympians, { x: 'weight', y: 'height', stroke: 'sex' }),
          Plot.crosshair(olympians, { x: 'weight', y: 'height' }),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.15 + 0.7 * t, 0.7 - 0.4 * Math.sin(t * Math.PI * 2)], 5000) : undefined),
  });
};

export default mount;
