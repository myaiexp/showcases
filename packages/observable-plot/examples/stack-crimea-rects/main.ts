// Crimean War deaths as stacked rectY marks, widened by the interval option
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { crimea } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const data = await crimea();
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true },
      marks: [Plot.rectY(data, { x: 'date', y: 'deaths', interval: 'month', fill: 'cause' }), Plot.ruleY([0])],
    }),
  );
};

export default mount;
