// A hexbin map of county density from geoCentroid
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const counties = topojson.feature(us, us.objects.counties).features;
  return mountStatic(el, ctx, ({ width, height }) =>
    // geoCentroid feeds hexbin longitudes and latitudes; r: count sizes each hexagon.
    Plot.dot(counties, Plot.hexbin<Plot.DotOptions>({ r: 'count' }, Plot.geoCentroid())).plot({ width, height, projection: 'albers' }),
  );
};

export default mount;
