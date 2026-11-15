// hexbin: screen-space hexagonal bins of cars, colored by how many cars fall in each bin
import { colorGradientLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { hexbin } from '@tanstack/charts/spatial/hexbin';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleSequential } from 'd3-scale';
import { heat } from '../../shared/marks2-color.ts';
import type { Mount } from '@/types.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(600, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a hexagon for its count and the cars inside it.' });

  const definition = defineChart({
    marks: [hexbin(rows, { x: 'weight', y: 'economy', binWidth: 24, color: 'count', stroke: '#111' })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Weight (lb)' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Economy (mpg)' } },
    },
    color: {
      scale: () => scaleSequential(heat),
      ...(stage.preview ? {} : { legend: colorGradientLegend({ label: 'Cars per bin' }) }),
    },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.count} cars\nnear ${Math.round(point.datum.x)} lb, ${point.datum.y.toFixed(1)} mpg`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Hexagonal bins of car weight and economy' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
