// Plot.find as a reducer: pivot tall rows into female and male columns
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const athletes = await csv('athletes.csv');
  // A tall table: one row per sport and sex, holding the mean weight.
  const tall = d3
    .rollups(athletes, (g) => d3.mean(g, (d) => d.weight), (d) => d.sport, (d) => d.sex)
    .flatMap(([sport, sexes]) => sexes.map(([sex, weight]) => ({ sport, sex, weight })))
    .filter((d) => d.weight != null);
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginBottom: preview ? 10 : 100,
      x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
      y: { grid: true, label: 'Mean weight (kg)' },
      marks: [
        // find returns the first value whose row passes the test: two columns per sport.
        Plot.link(tall, Plot.groupX({ y1: Plot.find((d) => d.sex === 'female'), y2: Plot.find((d) => d.sex === 'male') }, { x: 'sport', y1: 'weight', y2: 'weight', stroke: 'currentColor', markerEnd: 'arrow' })),
      ],
    }),
  );
};

export default mount;
