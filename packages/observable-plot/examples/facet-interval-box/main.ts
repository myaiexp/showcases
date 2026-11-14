// Facets from quantitative data: the fy interval option bins height by 10cm
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = (ctx.preview ? thin(all, 5) : all).filter((d) => d.height);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      fy: { grid: true, tickFormat: '.1f', interval: 0.1, reverse: true },
      marks: [Plot.boxX(olympians, { x: 'weight', fy: 'height' })],
    }),
  );
};

export default mount;
