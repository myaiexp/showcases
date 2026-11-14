// crosshairX on a time series: pointing follows x, the dominant dimension
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' }), Plot.crosshairX(aapl, { x: 'Date', y: 'Close' })],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 5000) : undefined),
  });
};

export default mount;
