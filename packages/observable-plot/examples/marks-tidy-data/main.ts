// Tidy data: one dot per row, one polyline, or one polyline per z series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const SHAPES = ['dots: one per row', 'lineY: one polyline', 'lineY with z: one per series'] as const;
type Shape = (typeof SHAPES)[number];

const mount: Mount = async (el, ctx) => {
  const [aapl, bls] = await Promise.all([csv('aapl.csv'), csv('bls-metro-unemployment.csv')]);
  return mountPlot<{ shape: Shape }>(el, ctx, {
    initial: { shape: SHAPES[0] },
    render: ({ shape }, { width, height, preview }) => {
      if (shape === SHAPES[0]) return Plot.dot(aapl, { x: 'Date', y: 'Close' }).plot({ width, height });
      if (shape === SHAPES[1]) return Plot.lineY(aapl, { x: 'Date', y: 'Close' }).plot({ width, height });
      const rows = preview ? thin(bls, 3) : bls;
      return Plot.lineY(rows, { x: 'date', y: 'unemployment', z: 'division' }).plot({ width, height });
    },
    step: ({ shape }) => ({ shape: after(SHAPES, shape) }),
    controls: (bar, live) => {
      select(bar, 'shape', SHAPES, SHAPES[0], (shape) => live.set({ shape }));
    },
  });
};

export default mount;
