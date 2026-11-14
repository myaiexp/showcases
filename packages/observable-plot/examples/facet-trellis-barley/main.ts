// Trellis display: barley yields by variety, one fy facet per site
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const barley = await csv('barley.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: height ?? 800,
      marginRight: preview ? 20 : 90,
      marginLeft: preview ? 60 : 110,
      grid: true,
      x: { nice: true },
      y: { inset: 5, axis: preview ? null : 'left' },
      color: { type: 'categorical' },
      marks: [
        Plot.frame(),
        // sort orders the y and fy domains by descending median yield.
        Plot.dot(barley, { x: 'yield', y: 'variety', fy: 'site', stroke: 'year', sort: { y: '-x', fy: '-x', reduce: 'median' } }),
      ],
    }),
  );
};

export default mount;
