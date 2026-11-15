// focus: 'nearest-x' with an unbounded distance on a scatter: x decides, y is a tie-break
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(20, 11);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover anywhere, even far above the dots: the closest x wins.' });

  const definition = defineChart({
    marks: [dot(rows, { id: 'blobs', x: 'x', y: 'y', key: 'id', r: 4, color: 'group' })],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'x' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'y' } },
    },
    focus: 'nearest-x',
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with nearest-x focus' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.08]);
  return () => stage.dispose();
};

export default mount;
