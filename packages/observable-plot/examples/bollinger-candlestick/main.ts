// A candlestick chart from two ruleX marks over a bollinger band with no line
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { domain: [new Date('2014-01-01'), new Date('2014-06-01')] },
      y: { domain: [68, 92], grid: true },
      color: { domain: [-1, 0, 1], range: ['red', 'currentColor', 'green'] },
      marks: [
        Plot.bollingerY(aapl, { x: 'Date', y: 'Close', stroke: 'none', clip: true }),
        // The thin rule is the day's low to high; the thick one is open to close.
        Plot.ruleX(aapl, { x: 'Date', y1: 'Low', y2: 'High', strokeWidth: 1, clip: true }),
        Plot.ruleX(aapl, {
          x: 'Date',
          y1: 'Open',
          y2: 'Close',
          strokeWidth: 3,
          stroke: (d) => Math.sign(d.Close - d.Open),
          clip: true,
        }),
      ],
    }),
  );
};

export default mount;
