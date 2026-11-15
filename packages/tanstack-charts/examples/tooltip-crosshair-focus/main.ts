// crosshair({ x: { label: true }, y: false }): a vertical rule with a label that follows focus
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover or press Tab then the arrow keys: the rule and label snap to each week.' });

  const definition = defineChart({
    marks: [
      lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true, stroke: '#60a5fa', strokeWidth: 2.5 }),
      crosshair({ x: { label: true }, y: false }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, grid: true, axis: { label: 'Active users' } },
    },
    focus: 'nearest-x',
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly active users with a crosshair' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
