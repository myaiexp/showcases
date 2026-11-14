// US 2020 election margin as vectors on county centroids, with an albers-usa map
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';
import { loadCounties } from '../../shared/vector-counties.ts';

const mount: Mount = async (el, ctx) => {
  const { nation, statemesh, counties: all } = await loadCounties();
  const counties = ctx.preview ? thin(all, 4) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      projection: 'albers-usa',
      length: { type: 'sqrt', transform: Math.abs },
      marks: [
        Plot.geo(statemesh, { strokeWidth: 0.5 }),
        Plot.geo(nation),
        Plot.vector(
          counties,
          Plot.centroid({
            anchor: 'start',
            length: (d) => d.properties.margin2020 * d.properties.votes,
            stroke: (d) => (d.properties.margin2020 > 0 ? 'red' : 'blue'),
            rotate: (d) => (d.properties.margin2020 > 0 ? 60 : -60),
          }),
        ),
      ],
    }),
  );
};

export default mount;
