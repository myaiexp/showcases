// A horizontal histogram: binY with rectX
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
      x: { grid: true },
      marks: [Plot.rectX(olympians, Plot.binY<Plot.RectXOptions>({ x: 'count' }, { y: 'weight' })), Plot.ruleX([0])],
    }),
  );
};

export default mount;
