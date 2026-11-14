// Random-walk interpolation is grainy; the blur option smooths it
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const ca55 = await csv('ca55-south.csv');
  const blurs = [0, 2, 5, 8];
  return mountPlot<{ blur: number }>(el, ctx, {
    initial: { blur: 5 },
    render: ({ blur }, { width, height, preview }) =>
      Plot.raster(ca55, {
        x: 'LONGITUDE',
        y: 'LATITUDE',
        fill: 'MAG_IGRF90',
        interpolate: 'random-walk',
        blur,
        pixelSize: preview ? 4 : 2,
      }).plot({ width, height, color: { type: 'diverging' } }),
    step: (_s, i) => ({ blur: blurs[i % blurs.length] ?? 5 }),
    previewMs: 3000,
    controls: (bar, live) => {
      slider(bar, 'blur (pixels)', [0, 10, 1], live.state.blur, (blur) => live.set({ blur }));
    },
  });
};

export default mount;
