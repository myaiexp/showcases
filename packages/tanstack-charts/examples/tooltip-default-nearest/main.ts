// The smallest interactive chart: import tooltip, add it to the definition
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: the nearest point gets a ring and a tooltip.' });

  const definition = defineChart({
    marks: [lineY(weeks, { id: 'users', x: 'week', y: 'value', key: 'id', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Active users' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly active users' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
