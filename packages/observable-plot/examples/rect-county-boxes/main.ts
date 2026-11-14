// Rect: US county bounding boxes drawn with x1, y1, x2, y2 in albers-usa
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { thin, topojson, usTopology } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const counties = topojson.feature(us, us.objects.counties).features;
  // Each box is [x1, y1, x2, y2]: longitude and latitude bounds of one county.
  const all = counties.map((d) => d3.geoBounds(d).flat());
  const countyboxes = ctx.preview ? thin(all, 6) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      projection: 'albers-usa',
      marks: [
        Plot.rect(countyboxes, {
          x1: '0', // or ([x1]) => x1
          y1: '1',
          x2: '2',
          y2: '3',
          stroke: 'currentColor',
        }),
      ],
    }),
  );
};

export default mount;
