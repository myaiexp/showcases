// Warming stripes: one full-height bar per year, colored by temperature anomaly
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { hadcrut } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const data = await hadcrut();
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { round: true, tickFormat: 'd' },
      color: { scheme: 'BuRd' },
      marks: [
        // No y channel, so each bar spans the chart; interval 1 suits annual data.
        Plot.barX(data, { x: 'year', fill: 'anomaly', interval: 1, inset: 0 }),
      ],
    }),
  );
};

export default mount;
