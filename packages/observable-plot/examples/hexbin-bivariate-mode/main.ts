// Hexbin with independent channels: r is the count, fill the most common sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    // fill is both an input channel (sex) and an output reduced with mode.
    Plot.dot(olympians, Plot.hexbin({ fill: 'mode', r: 'count' }, { x: 'weight', y: 'height', fill: 'sex' })).plot({
      width,
      height,
      color: { legend: !ctx.preview },
    }),
  );
};

export default mount;
