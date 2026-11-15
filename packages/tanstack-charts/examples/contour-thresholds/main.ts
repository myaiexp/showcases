// contour thresholds: an approximate level count, or the exact levels to draw
import { defineChart, mountChart } from '@tanstack/charts';
import { contour } from '@tanstack/charts/spatial/contour';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { hillGrid } from '../../shared/marks2-field.ts';
import { createStage } from '../../shared/stage.ts';

const grid = hillGrid(60, 40);
const modes: readonly (readonly [number | readonly number[], string])[] = [
  [5, 'count 5'],
  [10, 'count 10'],
  [24, 'count 24'],
  [[2, 5, 8], 'levels [2, 5, 8]'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (thresholds: number | readonly number[]) =>
    defineChart({
      svgAnimation: true,
      marks: [contour(grid, { width: 60, height: 40, value: 'height', thresholds, stroke: '#0b0b0f', strokeWidth: 0.5 })],
      scales: { x: null, y: null },
      guides: false,
      color: { scale: scaleSequential(heat).domain([0, 10]) },
    });

  const options = (t: number | readonly number[]) => ({ definition: build(t), height: stage.height, ariaLabel: 'Contour thresholds' });
  const host = stage.own(mountChart(stage.box, options(10)));
  const show = (t: number | readonly number[], i: number): void => {
    host.update(options(t));
    stage.say(`thresholds: ${modes[i]?.[1] ?? ''}`);
  };
  if (stage.bar) select(stage.bar, 'thresholds', modes, (t) => show(t, modes.findIndex((m) => m[0] === t)), 10);
  else stage.cycle(modes.map((m) => m[0]), 1700, show);
  return () => stage.dispose();
};

export default mount;
