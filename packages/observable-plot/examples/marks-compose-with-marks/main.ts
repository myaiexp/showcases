// Plot.marks: rule, area and line composed into one mark that plots itself
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const STOCKS = ['AAPL', 'GOOG'] as const;
type Stock = (typeof STOCKS)[number];

const mount: Mount = async (el, ctx) => {
  const data = { AAPL: await csv('aapl.csv'), GOOG: await csv('goog.csv') };
  return mountPlot<{ stock: Stock }>(el, ctx, {
    initial: { stock: 'AAPL' },
    render: ({ stock }, { width, height }) => {
      const color = stock === 'AAPL' ? 'steelblue' : 'tomato';
      // The returned array of marks has a .plot method, like any single mark.
      return Plot.marks(
        Plot.ruleY([0]),
        Plot.areaY(data[stock], { x: 'Date', y: 'Close', fill: color, fillOpacity: 0.2 }),
        Plot.lineY(data[stock], { x: 'Date', y: 'Close', stroke: color }),
      ).plot({ width, height });
    },
    step: ({ stock }) => ({ stock: after(STOCKS, stock) }),
    controls: (bar, live) => {
      select(bar, 'data', STOCKS, 'AAPL', (stock) => live.set({ stock }));
    },
  });
};

export default mount;
