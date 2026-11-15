// densityContour: a smoothed point density estimated in plot pixels, drawn as nested contour bands
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { densityContour } from '@tanstack/charts/spatial/density';
import type { Mount } from '@/types.ts';
import { penguins } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = penguins(80).filter((p) => p.species === 'Adelie');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      densityContour(rows, {
        x: 'billLength',
        y: 'billDepth',
        bandwidth: 18,
        thresholds: [0.0004, 0.0008, 0.0012, 0.0016, 0.002, 0.0024],
        fill: '#2563eb',
        fillOpacity: 0.16,
        stroke: '#93c5fd',
      }),
      // The density mark has no pointer targets of its own, so the points sit on top.
      dot(rows, { x: 'billLength', y: 'billDepth', r: 2, fill: '#e5e7eb', fillOpacity: 0.7 }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill length (mm)' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill depth (mm)' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Density contours of penguin bills' }));
  return () => stage.dispose();
};

export default mount;
