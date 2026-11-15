// densityContour z: one independent estimator per group, with shared levels
import { defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { densityContour } from '@tanstack/charts/spatial/density';
import type { Mount } from '@/types.ts';
import { penguins } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = penguins(70);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      densityContour(rows, {
        x: 'billLength',
        y: 'billDepth',
        z: 'species',
        bandwidth: 14,
        thresholds: 6,
        fillOpacity: 0.12,
        strokeOpacity: 0.9,
        stroke: (d) => (d.group === 'Adelie' ? '#60a5fa' : d.group === 'Chinstrap' ? '#fb923c' : '#4ade80'),
      }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill length (mm)' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill depth (mm)' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Density contours by species' }));
  return () => stage.dispose();
};

export default mount;
