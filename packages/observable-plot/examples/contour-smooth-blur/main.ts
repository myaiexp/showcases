// Contour options: blur radius and the smooth switch on a raster grid
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { volcano } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const v = await volcano();
  return mountPlot<{ blur: number; smooth: boolean }>(el, ctx, {
    initial: { blur: 0, smooth: true },
    render: ({ blur, smooth }, { width, height }) =>
      Plot.contour(v.values, {
        width: v.width,
        height: v.height,
        fill: Plot.identity,
        thresholds: 12,
        blur,
        smooth,
      }).plot({ width, height }),
    step: (_s, i) => ({ blur: [0, 2, 5, 0][i % 4], smooth: i % 4 !== 3 }),
    previewMs: 2600,
    controls: (bar, live) => {
      slider(bar, 'blur', [0, 8, 0.5], live.state.blur, (blur) => live.set({ blur }));
      toggle(bar, 'smooth', live.state.smooth, (smooth) => live.set({ smooth }));
    },
  });
};

export default mount;
