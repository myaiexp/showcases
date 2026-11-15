// linearRegressionY over a dot scatter: fit line plus confidence band
import { defineChart, dot, linearRegressionY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { noisyLines } from '../../shared/marks1-scatter.ts';
import { createStage } from '../../shared/stage.ts';

const rows = noisyLines({ car: [60, -1.1] }, 60, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the fitted line: each sample reports x, the fitted y and the band edges.' });

  const definition = defineChart({
    marks: [
      dot(rows, { x: 'x', y: 'y', fillOpacity: 0.55 }),
      linearRegressionY(rows, { x: 'x', y: 'y', ci: 0.95, stroke: '#f59e0b' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'Power' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Economy' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a fitted line' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
