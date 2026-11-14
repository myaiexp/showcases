// Layered stock lines: one mark per table, or one table with a Symbol column
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const MODES = ['two marks, literal colors', 'one mark, Symbol column'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const [aapl, goog] = await Promise.all([csv('aapl.csv'), csv('goog.csv')]);
  // Combine the tables with a Symbol column to distinguish the two stocks.
  const stocks = [...aapl.map((d) => ({ ...d, Symbol: 'AAPL' })), ...goog.map((d) => ({ ...d, Symbol: 'GOOG' }))];
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height, preview }) =>
      mode === MODES[0]
        ? Plot.plot({
            width,
            height,
            marks: [
              Plot.ruleY([0]),
              Plot.lineY(goog, { x: 'Date', y: 'Close', stroke: 'red' }),
              Plot.lineY(aapl, { x: 'Date', y: 'Close', stroke: 'blue' }),
            ],
          })
        : Plot.plot({
            width,
            height,
            color: { legend: !preview },
            marks: [Plot.ruleY([0]), Plot.lineY(stocks, { x: 'Date', y: 'Close', stroke: 'Symbol' })],
          }),
    step: ({ mode }) => ({ mode: after(MODES, mode) }),
    controls: (bar, live) => {
      select(bar, 'data', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });
};

export default mount;
