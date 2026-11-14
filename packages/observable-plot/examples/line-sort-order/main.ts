// A line connects points in input order: shuffled data is gibberish until sorted
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const rows = ctx.preview ? aapl.slice(-250) : aapl;
  // d3.shuffler with a seeded source, so the mess is the same every time.
  const shuffled = d3.shuffler(d3.randomLcg(7))(rows);
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: false },
    render: ({ sorted }, { width, height }) =>
      Plot.lineY(shuffled, { x: 'Date', y: 'Close', sort: sorted ? 'Date' : undefined }).plot({
        width,
        height,
        y: { grid: true },
      }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    previewMs: 2800,
    controls: (bar, live) => {
      toggle(bar, 'sort: "Date"', live.state.sorted, (sorted) => live.set({ sorted }));
    },
  });
};

export default mount;
