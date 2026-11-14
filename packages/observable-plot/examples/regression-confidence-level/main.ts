// The ci option sets the confidence band; zero hides it
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  const levels = [0, 0.5, 0.8, 0.95, 0.99];
  return mountPlot<{ ci: number }>(el, ctx, {
    initial: { ci: 0.95 },
    render: ({ ci }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(cars, { x: 'weight (lb)', y: 'power (hp)', r: 2, strokeOpacity: 0.5 }),
          Plot.linearRegressionY(cars, { x: 'weight (lb)', y: 'power (hp)', stroke: 'red', ci, fillOpacity: 0.2 }),
        ],
      }),
    step: (_s, i) => ({ ci: levels[i % levels.length] ?? 0.95 }),
    previewMs: 2200,
    controls: (bar, live) => {
      slider(bar, 'ci', [0, 0.99, 0.01], live.state.ci, (ci) => live.set({ ci }));
    },
  });
};

export default mount;
