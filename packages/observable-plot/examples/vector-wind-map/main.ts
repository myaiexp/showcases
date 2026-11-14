// Wind over western Europe: vector rotate and length from u and v components
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('wind.csv');
  const wind = ctx.preview ? thin(all, 3) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      inset: 10,
      aspectRatio: height ? undefined : 1,
      color: { label: 'Speed (m/s)', zero: true, legend: !height },
      marks: [
        Plot.vector(wind, {
          x: 'longitude',
          y: 'latitude',
          rotate: ({ u, v }) => (Math.atan2(u, v) * 180) / Math.PI,
          length: ({ u, v }) => Math.hypot(u, v),
          stroke: ({ u, v }) => Math.hypot(u, v),
        }),
      ],
    }),
  );
};

export default mount;
