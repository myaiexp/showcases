// Rule: a candlestick chart from two ruleX marks (low-high, open-close)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('aapl.csv');
  const aapl = ctx.preview ? all.slice(-90) : all;
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      inset: 6,
      label: null,
      y: { grid: true, label: 'Stock price ($)' },
      color: { type: 'threshold', range: ['red', 'green'] },
      marks: [
        Plot.ruleX(aapl, { x: 'Date', y1: 'Low', y2: 'High' }),
        Plot.ruleX(aapl, { x: 'Date', y1: 'Open', y2: 'Close', stroke: (d) => d.Close - d.Open, strokeWidth: preview ? 3 : 4 }),
      ],
    }),
  );
};

export default mount;
