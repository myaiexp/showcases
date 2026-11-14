// Weight against power for cars, with a linear regression line and confidence band
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [
        Plot.dot(cars, { x: 'weight (lb)', y: 'power (hp)' }),
        Plot.linearRegressionY(cars, { x: 'weight (lb)', y: 'power (hp)', stroke: 'red' }),
      ],
    }),
  );
};

export default mount;
