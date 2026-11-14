// Vertical area chart: areaX with y as time and x as the stacked value
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { grid: true },
      marks: [Plot.areaX(aapl, { y: 'Date', x: 'Close', line: true }), Plot.ruleX([0])],
    }),
  );
};

export default mount;
