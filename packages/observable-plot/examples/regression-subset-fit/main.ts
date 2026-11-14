// Fit the regression to the first m cars: the band narrows as m grows
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  const steps = [2, 5, 12, 30, 80, 200, cars.length];
  return mountPlot<{ m: number }>(el, ctx, {
    initial: { m: ctx.preview ? 2 : 40 },
    render: ({ m }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(cars, { x: 'weight (lb)', y: 'power (hp)', fill: 'currentColor', fillOpacity: 0.2 }),
          Plot.dot(cars.slice(0, m), { x: 'weight (lb)', y: 'power (hp)' }),
          Plot.linearRegressionY(cars.slice(0, m), { x: 'weight (lb)', y: 'power (hp)', stroke: 'red' }),
        ],
      }),
    step: (_s, i) => ({ m: steps[i % steps.length] ?? 2 }),
    previewMs: 1500,
    controls: (bar, live) => {
      slider(bar, 'Number of points (m)', [0, cars.length, 1], live.state.m, (m) => live.set({ m }));
    },
  });
};

export default mount;
