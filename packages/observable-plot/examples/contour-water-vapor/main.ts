// Contour of a world raster through the equal-earth projection
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { text } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const raw = await text('MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv');
  // 99999.0 marks missing cells (the oceans' clouds); NaN keeps them out of the contours.
  const vapor = d3
    .csvParseRows(raw)
    .flat()
    .map((x) => (x === '99999.0' ? NaN : +x));
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      projection: 'equal-earth',
      color: { scheme: 'BuPu', domain: [0, 6], legend: !preview, label: 'Water vapor (cm)' },
      marks: [
        Plot.contour(vapor, {
          fill: Plot.identity,
          width: 360,
          height: 180,
          x1: -180,
          y1: 90,
          x2: 180,
          y2: -90,
          blur: 1,
          stroke: 'black',
          strokeWidth: 0.5,
          clip: 'sphere',
        }),
        Plot.sphere({ stroke: 'currentColor' }),
      ],
    }),
  );
};

export default mount;
