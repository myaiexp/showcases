// Normalize offset: each year rescaled to fill [0, 1], showing revenue share
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { label: 'Annual revenue (%)', percent: true },
      marks: [
        Plot.areaY(
          riaa,
          Plot.stackY({ offset: 'normalize', order: 'group', reverse: true }, { x: 'year', y: 'revenue', z: 'format', fill: 'group' }),
        ),
        Plot.ruleY([0, 1]),
      ],
    }),
  );
};

export default mount;
