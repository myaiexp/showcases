// anchor: 'pointer' with a placement fallback list and a 12px offset
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(18, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move across the dots: the tooltip sticks to the pointer, not the dot centre.' });

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', key: 'id', r: 14, fillOpacity: 0.5 })],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip: { use: tooltip, anchor: 'pointer', placement: ['right', 'left', 'bottom', 'top'], offset: 12 },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with large dots' }));
  if (stage.preview) stage.ghost((t) => [0.2 + 0.6 * t, 0.5 + 0.2 * Math.sin(t * 9)]);
  return () => stage.dispose();
};

export default mount;
