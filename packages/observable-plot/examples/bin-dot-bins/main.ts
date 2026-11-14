// Dots on one dimension: binX with r count on a dot mark
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      r: { range: [0, height ? 10 : 14] },
      marks: [Plot.dot(olympians, Plot.binX<Plot.DotOptions>({ r: 'count' }, { x: 'weight' }))],
    }),
  );
};

export default mount;
