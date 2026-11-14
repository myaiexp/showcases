// px and py target positions apart from the marks drawn
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 160,
        y: { axis: 'right', grid: true, nice: true },
        marks: [
          Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
          Plot.ruleX(aapl, Plot.pointerX({ x: 'Date', py: 'Close', stroke: 'red' })),
          Plot.dot(aapl, Plot.pointerX({ x: 'Date', y: 'Close', stroke: 'red' })),
          Plot.text(
            aapl,
            Plot.pointerX({
              px: 'Date',
              py: 'Close',
              dy: -17,
              frameAnchor: 'top-left',
              fontVariant: 'tabular-nums',
              text: (d: Row) => [`Date ${Plot.formatIsoDate(d.Date)}`, `Close ${d.Close.toFixed(2)}`].join('   '),
            }),
          ),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 5000) : undefined),
  });
};

export default mount;
