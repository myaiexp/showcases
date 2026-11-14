// Regressing y on x and x on y gives two different lines
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ y: boolean; x: boolean }>(el, ctx, {
    initial: { y: true, x: true },
    render: ({ y, x }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(cars, { x: 'weight (lb)', y: 'power (hp)', strokeOpacity: 0.5, r: 2 }),
          y ? Plot.linearRegressionY(cars, { x: 'weight (lb)', y: 'power (hp)', stroke: 'steelblue' }) : null,
          x ? Plot.linearRegressionX(cars, { x: 'weight (lb)', y: 'power (hp)', stroke: 'orange' }) : null,
        ],
      }),
    step: ({ y }) => ({ y: !y, x: true }),
    previewMs: 2500,
    controls: (bar, live) => {
      toggle(bar, 'linearRegressionY (blue)', live.state.y, (y) => live.set({ y }));
      toggle(bar, 'linearRegressionX (orange)', live.state.x, (x) => live.set({ x }));
    },
  });
};

export default mount;
