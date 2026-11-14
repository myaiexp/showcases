// Year-over-year change per variety as arrows, one facet per barley site
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
      marginLeft: preview ? 60 : 110,
      grid: true,
      x: { nice: true },
      y: { inset: 5, axis: preview ? null : 'left' },
      color: { scheme: 'spectral', label: 'Change in yield', tickFormat: '+f', legend: !preview },
      facet: { marginRight: preview ? 20 : 90 },
      marks: [
        Plot.frame(),
        Plot.arrow(
          barley,
          Plot.groupY(
            {
              x1: 'first',
              x2: 'last',
              stroke: ([x1, x2]: any[]) => x2 - x1, // year-over-year difference
            },
            { x: 'yield', y: 'variety', fy: 'site', stroke: 'yield', strokeWidth: 2, sort: { y: '-x1', fy: '-x1', reduce: 'median' } },
          ),
        ),
      ],
    }),
  );
};

export default mount;
