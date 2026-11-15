// contour smooth: interpolated marching-squares crossings against grid-aligned steps
import { defineChart, mountChart } from '@tanstack/charts';
import { contour } from '@tanstack/charts/spatial/contour';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { hillGrid } from '../../shared/marks2-field.ts';
import { createStage } from '../../shared/stage.ts';

const grid = hillGrid(24, 16);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (smooth: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [contour(grid, { width: 24, height: 16, value: 'height', thresholds: 8, smooth, stroke: '#0b0b0f', strokeWidth: 0.5 })],
      scales: { x: null, y: null },
      guides: false,
      color: { scale: scaleSequential(heat).domain([0, 10]) },
    });

  const options = (smooth: boolean) => ({ definition: build(smooth), height: stage.height, ariaLabel: 'Contours with and without smoothing' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (smooth: boolean): void => {
    host.update(options(smooth));
    stage.say(`smooth: ${smooth}. The grid is only 24 by 16, so the difference is easy to see.`);
  };
  if (stage.bar) checkbox(stage.bar, 'smooth', true, show);
  else stage.cycle([true, false], 2000, show);
  return () => stage.dispose();
};

export default mount;
