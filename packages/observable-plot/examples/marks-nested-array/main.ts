// A nested array of marks: Array.map makes one line mark per stock
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [aapl, goog] = await Promise.all([csv('aapl.csv'), csv('goog.csv')]);
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      // The inner array is flattened: plot accepts arrays of marks anywhere in marks.
      marks: [[goog, aapl].map((stock) => Plot.lineY(stock, { x: 'Date', y: 'Close' }))],
    }),
  );
};

export default mount;
