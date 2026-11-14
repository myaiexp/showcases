// Rule: a literal-array ruleY marks y = 0 on a line, or y = 1 on a log scale
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const pct = d3.format('+d');
  return mountPlot<{ normalized: boolean }>(el, ctx, {
    initial: { normalized: false },
    render: ({ normalized }, { width, height }) =>
      normalized
        ? Plot.plot({
            width,
            height,
            y: {
              type: 'log',
              grid: true,
              label: 'Change in price (%)',
              tickFormat: (d: number) => pct((d - 1) * 100),
            },
            marks: [Plot.ruleY([1], { stroke: 'red' }), Plot.line(aapl, Plot.normalizeY('first', { x: 'Date', y: 'Close' }))],
          })
        : Plot.plot({
            width,
            height,
            y: { grid: true },
            marks: [Plot.ruleY([0], { stroke: 'red' }), Plot.line(aapl, { x: 'Date', y: 'Close' })],
          }),
    step: ({ normalized }) => ({ normalized: !normalized }),
    controls: (bar, live) => {
      toggle(bar, 'normalize to first close (log y, rule at 1)', live.state.normalized, (normalized) => live.set({ normalized }));
    },
  });
};

export default mount;
