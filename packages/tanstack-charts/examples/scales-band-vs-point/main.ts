// Band scales give categories width (bars); point scales give them a position only (lines, dots)
import { barY, defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: scaleBand with bars. Right: scalePoint with a line and dots.' });
  const right = stage.addBox();

  const bands = defineChart({
    marks: [barY(signups, { x: 'month', y: 'value' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2), axis: { label: 'scaleBand' } },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });
  const points = defineChart({
    marks: [lineY(signups, { x: 'month', y: 'value' }), dot(signups, { x: 'month', y: 'value', r: 4 })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.5), axis: { label: 'scalePoint' } },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition: bands, height: stage.height, ariaLabel: 'Band scale bars' }));
  stage.own(mountChart(right, { definition: points, height: stage.height, ariaLabel: 'Point scale line' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
