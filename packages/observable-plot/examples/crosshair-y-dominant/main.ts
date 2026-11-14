// crosshairY when y is the dominant dimension: a time series drawn vertically
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
        marks: [Plot.lineX(aapl, { x: 'Close', y: 'Date' }), Plot.crosshairY(aapl, { x: 'Close', y: 'Date' })],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.5, 0.1 + 0.8 * t], 5000) : undefined),
  });
};

export default mount;
