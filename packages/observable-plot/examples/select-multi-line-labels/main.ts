// Select transform per series: selectLast labels each stock line
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginRight: 40,
        y: { grid: true },
        marks: [
          Plot.ruleY([0]),
          Plot.line(all, { x: 'Date', y: 'Close', stroke: 'Symbol' }),
          Plot.text(all, Plot.selectLast({ x: 'Date', y: 'Close', z: 'Symbol', text: 'Symbol', textAnchor: 'start', dx: 3 })),
        ],
      }),
  });
};

export default mount;
