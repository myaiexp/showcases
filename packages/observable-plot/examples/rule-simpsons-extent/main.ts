// Rule: per-season rating extent from groupX min and max, with dots and a median
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const simpsons = await csv('simpsons.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [
        Plot.ruleX(simpsons, Plot.groupX({ y1: 'min', y2: 'max' }, { x: 'season', y: 'imdb_rating' })),
        Plot.dot(simpsons, { x: 'season', y: 'imdb_rating', fill: 'currentColor', stroke: 'var(--plot-background)' }),
        Plot.lineY(simpsons, Plot.groupX({ y: 'median' }, { x: 'season', y: 'imdb_rating', stroke: 'red' })),
      ],
    }),
  );
};

export default mount;
