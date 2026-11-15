// hexbin r with rScale: hexagon size shows the count while color shows the mean cylinders
import { defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { hexbin } from '@tanstack/charts/spatial/hexbin';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleSequential, scaleSqrt } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { heat } from '../../shared/marks2-color.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(600, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bigger hexagons hold more cars; color is the mean cylinder count.' });

  const definition = defineChart({
    marks: [
      hexbin(rows, {
        x: 'weight',
        y: 'economy',
        binWidth: 30,
        outputs: { count: { reduce: 'count' }, cylinders: { value: 'cylinders', reduce: 'mean' } },
        color: 'cylinders',
        // r reads the count, and rScale turns it into a pixel circumradius.
        r: 'count',
        rScale: scaleSqrt().domain([0, 30]).range([2, 17]).clamp(true),
      }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true },
    },
    color: { scale: scaleSequential(heat).domain([4, 8]) },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.count} cars, mean ${point.datum.cylinders.toFixed(1)} cylinders`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Hexagons sized by count' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
