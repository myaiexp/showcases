// The dodge transform on a text mark: IPO valuations as sized numbers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const ipos = await csv('ipos.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: height ?? 790,
      insetRight: 10,
      marks: [
        Plot.text(
          preview ? thin(ipos, 12) : ipos,
          Plot.dodgeY({
            x: 'date',
            r: 'rMVOP',
            text: (d) => (d.rMVOP / 1e3).toFixed(1),
            title: 'NAME',
            fontSize: (d) => Math.min(22, Math.cbrt(d.rMVOP / 1e3) * (preview ? 4 : 6)),
          }),
        ),
      ],
    }),
  );
};

export default mount;
