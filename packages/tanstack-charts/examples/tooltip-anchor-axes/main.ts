// anchor: { x: 'value', y: 'plot-top' }: follow the x value, fix the y at the plot top
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tooltip slides along the top of the plot as you move.' });

  const definition = defineChart({
    marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, grid: true },
    },
    focus: 'nearest-x',
    tooltip: { use: tooltip, anchor: { x: 'value', y: 'plot-top' }, placement: 'bottom', offset: 12 },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly active users' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
