// Density mark with only an x channel
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { tsv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const faithful = await tsv('faithful.tsv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 100,
      inset: 10,
      marks: [
        Plot.density(faithful, { x: 'waiting', stroke: 'blue', strokeWidth: 0.25, bandwidth: 10 }),
        Plot.density(faithful, { x: 'waiting', stroke: 'blue', thresholds: 4, bandwidth: 10 }),
        Plot.dot(faithful, { x: 'waiting', fill: 'currentColor', r: 1.5 }),
      ],
    }),
  );
};

export default mount;
