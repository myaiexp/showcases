// Normalize transform: normalizeY with the first basis, an index chart
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  const pct = d3.format('+d');
  return mountPlot<{ log: boolean }>(el, ctx, {
    initial: { log: true },
    render: ({ log }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginRight: 40,
        y: { type: log ? 'log' : 'linear', grid: true, label: 'Change in price (%)', tickFormat: (x: number) => pct((x - 1) * 100) },
        marks: [
          Plot.ruleY([1]),
          Plot.line(all, Plot.normalizeY({ x: 'Date', y: 'Close', stroke: 'Symbol' })),
          Plot.text(all, Plot.selectLast(Plot.normalizeY({ x: 'Date', y: 'Close', z: 'Symbol', text: 'Symbol', textAnchor: 'start', dx: 3 }))),
        ],
      }),
    step: ({ log }) => ({ log: !log }),
    controls: (bar, live) => {
      toggle(bar, 'log y scale', live.state.log, (log) => live.set({ log }));
    },
  });
};

export default mount;
