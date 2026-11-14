// Two lines share one x and one y scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [goog, aapl] = await Promise.all([csv('goog.csv'), csv('aapl.csv')]);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(goog, { x: 'Date', y: 'Close', stroke: 'red' }),
        Plot.lineY(aapl, { x: 'Date', y: 'Close', stroke: 'blue' }),
      ],
    }),
  );
};

export default mount;
