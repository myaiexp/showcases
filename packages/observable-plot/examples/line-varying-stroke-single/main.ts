// When stroke equals y, z defaults to null: one line that changes colour
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.lineY(aapl, { x: 'Date', y: 'Close', stroke: 'Close' }).plot({ width, height, y: { grid: true } }),
  );
};

export default mount;
