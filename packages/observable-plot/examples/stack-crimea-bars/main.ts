// Crimean War deaths as stacked bars on an ordinal month axis
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
      x: {
        interval: 'month',
        tickFormat: (d: Date) => d.toLocaleString('en', { month: 'narrow' }),
        label: null,
      },
      y: { grid: true },
      marks: [Plot.barY(data, { x: 'date', y: 'deaths', fill: 'cause' }), Plot.ruleY([0])],
    }),
  );
};

export default mount;
