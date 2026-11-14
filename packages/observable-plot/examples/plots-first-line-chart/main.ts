// A first line chart: Plot.lineY of Apple's close price by date
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({ width, height, marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' })] }),
  );
};

export default mount;
