// A tip on every dot: extra channels name and sport show up in the tooltip
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
      Plot.dot(olympians, {
        x: 'weight',
        y: 'height',
        stroke: 'sex',
        channels: { name: 'name', sport: 'sport' },
        tip: true,
      }).plot({ width, height }),
    // The pointer transform behind tip: true listens to real pointer events.
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.65 - 0.3 * Math.sin(t * Math.PI * 2)], 5000) : undefined),
  });
};

export default mount;
