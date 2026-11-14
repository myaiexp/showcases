// Voronoi mesh of Walmart stores through an albers projection
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { thin, topojson, tsv, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [all, us] = await Promise.all([tsv('walmarts.tsv'), usTopology()]);
  const walmarts = ctx.preview ? thin(all, 3) : all;
  const nation = topojson.feature(us, us.objects.nation);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      projection: 'albers',
      marks: [
        Plot.geo(nation),
        Plot.dot(walmarts, { x: 'longitude', y: 'latitude', fill: 'currentColor', r: 1 }),
        Plot.voronoiMesh(walmarts, { x: 'longitude', y: 'latitude' }),
      ],
    }),
  );
};

export default mount;
