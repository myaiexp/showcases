// linearRegressionY with z: an independent least-squares model per series
import { defineChart, dot, linearRegressionY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { noisyLines } from '../../shared/marks1-scatter.ts';
import { createStage } from '../../shared/stage.ts';

const rows = noisyLines({ Adelie: [5, 0.9], Gentoo: [40, -0.4], Chinstrap: [20, 0.2] }, 30, 3.5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a fitted line to see which series it belongs to.' });

  const definition = defineChart({
    marks: [
      dot(rows, { x: 'x', y: 'y', z: 'group', fillOpacity: 0.55 }),
      linearRegressionY(rows, { x: 'x', y: 'y', z: 'group' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Three scatter series, each with a fitted line' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
