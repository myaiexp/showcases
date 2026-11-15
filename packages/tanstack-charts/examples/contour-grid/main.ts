// contour: level sets of a regular grid of heights, filled and colored by level
import { defineChart, mountChart } from '@tanstack/charts';
import { contour } from '@tanstack/charts/spatial/contour';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { heat } from '../../shared/marks2-color.ts';
import { hillGrid } from '../../shared/marks2-field.ts';
import { createStage } from '../../shared/stage.ts';

const grid = hillGrid(60, 40);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      // width and height describe the row-major grid; the first row is the bottom of the plot.
      contour(grid, { width: 60, height: 40, value: 'height', stroke: '#0b0b0f', strokeWidth: 0.5 }),
    ],
    scales: { x: null, y: null },
    guides: false,
    color: { scale: () => scaleSequential(heat) },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Contours of three hills' }));
  stage.say('2400 grid cells become filled bands, one polygon set per level.');
  return () => stage.dispose();
};

export default mount;
