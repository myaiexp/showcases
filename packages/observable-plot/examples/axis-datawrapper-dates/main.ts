// Date axis with a two-field tick format: ticks every 3 months, plus a grid
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TICKS = ['3 months', '6 months', 'year', '2 months'] as const;

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ ticks: string }>(el, ctx, {
    initial: { ticks: '3 months' },
    render: ({ ticks }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.ruleY([0]),
          Plot.axisX({ ticks }),
          Plot.gridX({ ticks }),
          Plot.line(aapl, { x: 'Date', y: 'Close' }),
        ],
      }),
    step: ({ ticks }) => ({ ticks: TICKS[(TICKS.indexOf(ticks as (typeof TICKS)[number]) + 1) % TICKS.length] }),
    controls: (bar, live) => {
      select(bar, 'ticks', TICKS, '3 months', (ticks) => live.set({ ticks }));
    },
  });
};

export default mount;
