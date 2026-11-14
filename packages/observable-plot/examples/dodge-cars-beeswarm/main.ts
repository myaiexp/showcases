// A beeswarm of car weights: dotX with dodgeY piles dots without overlap
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: height ?? 160,
      marks: [
        // title gives each dot a hover tip; fill: currentColor follows the page text colour.
        Plot.dotX(cars, Plot.dodgeY({ x: 'weight (lb)', title: 'name', fill: 'currentColor', r: preview ? 2 : undefined })),
      ],
    }),
  );
};

export default mount;
