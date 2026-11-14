// Global water vapour as a raster on an equal-earth projection, clipped to the sphere
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { text } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  // 360 x 180 grid; 99999 marks missing data.
  const vapor = d3
    .csvParseRows(await text('MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv'))
    .flat()
    .map((x) => (x === '99999.0' ? NaN : +x));
  return mountStatic(el, ctx, ({ width, preview }) =>
    Plot.plot({
      width, // no height: the projection sets it
      projection: 'equal-earth',
      color: { scheme: 'BuPu', domain: [0, 6], legend: !preview, label: 'Water vapor (cm)' },
      marks: [
        Plot.raster(vapor, {
          fill: Plot.identity,
          width: 360,
          height: 180,
          x1: -180,
          y1: 90,
          x2: 180,
          y2: -90,
          interpolate: 'barycentric',
          clip: 'sphere',
        }),
        Plot.sphere({ stroke: 'black' }),
      ],
    }),
  );
};

export default mount;
