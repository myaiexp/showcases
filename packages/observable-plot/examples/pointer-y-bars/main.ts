// pointerY on horizontal bars: y, the categorical dimension, picks the letter
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 30,
        x: { grid: true, percent: true },
        y: { label: null },
        marks: [
          Plot.barX(alphabet, { x: 'frequency', y: 'letter', sort: { y: '-x' } }),
          Plot.tip(alphabet, Plot.pointerY({ x: 'frequency', y: 'letter' })),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.4, 0.1 + 0.8 * t], 5000) : undefined),
  });
};

export default mount;
