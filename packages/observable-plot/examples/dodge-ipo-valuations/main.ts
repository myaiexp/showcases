// IPO valuations as sized dots: dodgeY with an r channel and labelled big ones
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
      // A card is 200px tall: shrink the radius range so the piles fit.
      r: preview ? { range: [0, 7] } : undefined,
      marks: [
        // With r as a channel, the biggest dots are placed first, nearest the baseline.
        Plot.dot(preview ? thin(ipos, 12) : ipos, Plot.dodgeY({ x: 'date', r: 'rMVOP', title: (d) => `${d.NAME}\n${(d.rMVOP / 1e3).toFixed(1)}B`, fill: 'currentColor' })),
        preview
          ? null
          : Plot.text(ipos, Plot.dodgeY({ filter: (d) => d.rMVOP > 5e3, x: 'date', r: 'rMVOP', text: (d) => (d.rMVOP / 1e3).toFixed(), fill: 'var(--plot-background)', pointerEvents: 'none' })),
      ],
    }),
  );
};

export default mount;
