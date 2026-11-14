// dot r channel with rScale: sqrt scale keeps area proportional to the value
import { scaleSqrt } from 'd3-scale';
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { city: 'Aarhus', income: 41, rent: 920, people: 360 },
  { city: 'Bergen', income: 52, rent: 1250, people: 290 },
  { city: 'Cork', income: 38, rent: 1100, people: 210 },
  { city: 'Danzig', income: 33, rent: 760, people: 470 },
  { city: 'Espoo', income: 55, rent: 1380, people: 300 },
  { city: 'Faro', income: 28, rent: 690, people: 60 },
  { city: 'Ghent', income: 46, rent: 1020, people: 260 },
  { city: 'Hamburg', income: 58, rent: 1180, people: 1850 },
];

const mappers = [
  [{ scale: () => scaleSqrt().range([3, 16]) }, 'rScale: sqrt scale, range [3, 16]'],
  [(v: number) => v / 40, 'rScale: (v) => v / 40'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bubble: its size is the population.' });

  const chart = (rScale: (typeof mappers)[number][0]) =>
    defineChart({
      svgAnimation: true,
      marks: [dot(rows, { x: 'income', y: 'rent', r: 'people', rScale, key: 'city', fillOpacity: 0.55, stroke: 'currentColor', strokeOpacity: 0.4 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Income (k)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Rent' } },
      },
      tooltip,
    });

  const options = { definition: chart(mappers[0][0]), height: stage.height, initialWidth: 640, ariaLabel: 'Cities as bubbles sized by population' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(mappers[i]![0]) });
    stage.say(mappers[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'radius mapping', mappers.map((m, i) => [i, m[1]] as const), show);
    stage.say(mappers[0][1]);
  } else {
    stage.cycle(mappers.map((_, i) => i), 2200, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
