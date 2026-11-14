// A voronoi mark over county centroids, one cell per county
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { thin, topojson, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const counties = topojson.feature(us, us.objects.counties).features;
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    // The voronoi mark takes its points from the centroid transform, so its data is the features.
    Plot.voronoi(preview ? thin(counties, 3) : counties, Plot.centroid()).plot({ width, height, projection: 'albers' }),
  );
};

export default mount;
