// barY with explicit y1/y2: floating interval bars, negative values allowed
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { month: 'Jan', low: -9, high: -1 },
  { month: 'Feb', low: -8, high: 1 },
  { month: 'Mar', low: -3, high: 6 },
  { month: 'Apr', low: 2, high: 12 },
  { month: 'May', low: 7, high: 18 },
  { month: 'Jun', low: 11, high: 22 },
  { month: 'Jul', low: 14, high: 25 },
  { month: 'Aug', low: 13, high: 24 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the point sits at the high end, y2.' });

  const definition = defineChart({
    marks: [barY(rows, { x: 'month', y1: 'low', y2: 'high', radius: 4 })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.3) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (°C)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Temperature range by month' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
