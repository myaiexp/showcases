// A histogram of athlete weights with binX, rectY and a zero rule
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
      y: { grid: true },
      marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight' })), Plot.ruleY([0])],
    }),
  );
};

export default mount;
