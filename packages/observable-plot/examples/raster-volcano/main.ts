// Heatmap of Maungawhau volcano elevations from a row-major grid of numbers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { volcano } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const grid = await volcano();
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      color: { label: 'Elevation (m)', legend: !preview },
      marks: [Plot.raster(grid.values, { width: grid.width, height: grid.height })],
    }),
  );
};

export default mount;
