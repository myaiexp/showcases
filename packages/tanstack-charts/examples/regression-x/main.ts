// linearRegressionX: fit x as a function of y
import { defineChart, dot, linearRegressionX, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { noisyLines } from '../../shared/marks1-scatter.ts';
import { createStage } from '../../shared/stage.ts';

// x is the noisy value here: swap the generated columns so y runs 5..50 and x follows it
const rows = noisyLines({ s: [4, 1.3] }, 50, 4, 31).map((p) => ({ hours: p.x, score: p.y }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      dot(rows, { x: 'score', y: 'hours', fillOpacity: 0.55 }),
      linearRegressionX(rows, { x: 'score', y: 'hours', stroke: '#f59e0b' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { label: 'Score' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Hours studied' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Score fitted over hours studied' }));
  return () => stage.dispose();
};

export default mount;
