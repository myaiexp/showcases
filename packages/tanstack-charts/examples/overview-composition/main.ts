// A line and dots drawn over the same rows: array order puts the points above the line
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot: the line and the dots share the same rows and scales.' });

  const definition = defineChart({
    marks: [
      lineY(signups, { x: 'month', y: 'value', stroke: '#2563eb', strokeWidth: 2 }),
      dot(signups, { x: 'month', y: 'value', fill: '#2563eb', r: 4 }),
    ],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Signups' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Monthly signups' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
