// bollingerX: the bands with time going up the y axis and price along x
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) => Plot.bollingerX(aapl, { y: 'Date', x: 'Close' }).plot({ width, height }));
};

export default mount;
