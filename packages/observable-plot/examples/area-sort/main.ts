// Area over shuffled AAPL rows: gibberish until the sort option orders them
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const shuffled = d3.shuffler(d3.randomLcg(7))(aapl.slice());
  return mountPlot(el, ctx, {
    initial: { sorted: false },
    render: ({ sorted }, { width, height }) =>
      // Points join in input order, so unsorted rows zigzag across the whole chart.
      Plot.areaY(shuffled, { x: 'Date', y: 'Close', sort: sorted ? 'Date' : undefined }).plot({ width, height }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'sort: "Date"', live.state.sorted, (sorted) => live.set({ sorted })),
  });
};

export default mount;
