// A custom interpolate function: nearest-neighbour values snapped to bands
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const ca55 = await csv('ca55-south.csv');
  const bands = [100, 40, 15, 5];
  // Same arguments as the built-ins: index, width, height, x, y, value. Return one value per pixel.
  const banded =
    (size: number): Plot.RasterInterpolateFunction =>
    (index, width, height, x, y, values) =>
      Plot.interpolateNearest(index, width, height, x, y, values).map((v) => Math.round(v / size) * size);
  return mountPlot<{ size: number }>(el, ctx, {
    initial: { size: 40 },
    render: ({ size }, { width, height, preview }) =>
      Plot.raster(ca55, {
        x: 'LONGITUDE',
        y: 'LATITUDE',
        fill: 'MAG_IGRF90',
        interpolate: banded(size),
        pixelSize: preview ? 4 : 2,
      }).plot({ width, height, color: { type: 'diverging' } }),
    step: (_s, i) => ({ size: bands[i % bands.length] ?? 40 }),
    previewMs: 3000,
    controls: (bar, live) => {
      slider(bar, 'band size (nT)', [1, 120, 1], live.state.size, (size) => live.set({ size }));
    },
  });
};

export default mount;
