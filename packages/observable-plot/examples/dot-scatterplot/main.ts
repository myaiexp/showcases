// Dot scatterplot: horsepower against fuel efficiency, raw or as a function
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const X = ['miles per gallon', 'gallons per 100 miles'] as const;
type XKind = (typeof X)[number];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('cars.csv');
  return mountPlot<{ x: XKind }>(el, ctx, {
    initial: { x: 'miles per gallon' },
    render: ({ x }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 10,
        x: { label: x === 'miles per gallon' ? 'Fuel efficiency (mpg)' : 'Fuel consumption (gallons per 100 miles)' },
        y: { label: 'Horsepower' },
        marks: [
          // A function for x derives the value per row; the relation turns roughly linear.
          Plot.dot(cars, { x: x === 'miles per gallon' ? 'economy (mpg)' : (d: Row) => 100 / d['economy (mpg)'], y: 'power (hp)' }),
        ],
      }),
    step: ({ x }) => ({ x: X[(X.indexOf(x) + 1) % X.length] }),
    controls: (bar, live) => select(bar, 'x', X, live.state.x, (x) => live.set({ x })),
  });
};

export default mount;
