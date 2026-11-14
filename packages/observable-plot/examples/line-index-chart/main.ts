// Index chart: normalizeY rebases each stock to its first close, on a log y scale
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [aapl, amzn, goog, ibm] = await Promise.all(['aapl', 'amzn', 'goog', 'ibm'].map((s) => csv(`${s}.csv`)));
  const series: [string, Row[] | undefined][] = [['AAPL', aapl], ['AMZN', amzn], ['GOOG', goog], ['IBM', ibm]];
  const stocks: Row[] = series.flatMap(([Symbol, data]) => (data ?? []).map((d) => ({ Symbol, ...d })));
  // A multiple of 1.6 reads as +60%.
  const pct = d3.format('+d');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginRight: 40,
      y: { type: 'log', grid: true, label: 'Change in price (%)', tickFormat: (x: number) => pct((x - 1) * 100) },
      marks: [
        Plot.ruleY([1]),
        // stroke is a channel, so z defaults to it and each symbol is its own series.
        Plot.line(stocks, Plot.normalizeY({ x: 'Date', y: 'Close', stroke: 'Symbol' })),
        Plot.text(
          stocks,
          Plot.selectLast(Plot.normalizeY({ x: 'Date', y: 'Close', z: 'Symbol', text: 'Symbol', textAnchor: 'start', dx: 3 })),
        ),
      ],
    }),
  );
};

export default mount;
