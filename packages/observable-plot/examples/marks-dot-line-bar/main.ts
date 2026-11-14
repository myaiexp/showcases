// Marks are geometric shapes: the same kind of data as dots, a line or bars
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const SHAPES = ['dot', 'lineY', 'barX'] as const;
type Shape = (typeof SHAPES)[number];

const mount: Mount = async (el, ctx) => {
  const [gistemp, alphabet] = await Promise.all([csv('gistemp.csv'), csv('alphabet.csv')]);
  return mountPlot<{ shape: Shape }>(el, ctx, {
    initial: { shape: 'dot' },
    render: ({ shape }, { width, height }) => {
      if (shape === 'dot') return Plot.dot(gistemp, { x: 'Date', y: 'Anomaly' }).plot({ width, height });
      if (shape === 'lineY') return Plot.lineY(gistemp, { x: 'Date', y: 'Anomaly' }).plot({ width, height });
      return Plot.barX(alphabet, { x: 'frequency', y: 'letter' }).plot({ width, height });
    },
    step: ({ shape }) => ({ shape: after(SHAPES, shape) }),
    controls: (bar, live) => {
      select(bar, 'mark', SHAPES, 'dot', (shape) => live.set({ shape }));
    },
  });
};

export default mount;
