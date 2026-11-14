// Tip: static annotations from a title string, placed with x, y, dy and anchor
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true },
      marks: [
        Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
        // Data that is an array of strings makes the title channel the identity.
        Plot.tip(['Apple stock reaches a new high of $133 on Feb. 23, 2015. The release of the first Apple Watch, slated for April, is hotly anticipated.'], {
          x: new Date('2015-02-23'),
          y: 133,
          dy: -3,
          anchor: 'bottom',
          fontSize: preview ? 7 : undefined,
        }),
        Plot.tip(['Apple stock drops 8% after the company misses Q2 revenue targets and reports declining iPhone sales. It reaches a two-year low of $90.34 on May 12.'], {
          x: new Date('2016-05-12'),
          y: 90.34,
          dy: 3,
          anchor: 'top',
          fontSize: preview ? 7 : undefined,
        }),
      ],
    }),
  );
};

export default mount;
