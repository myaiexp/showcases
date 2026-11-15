// The smallest useful chart: one bar mark, a band scale and a linear scale
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { alphabet } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar. The rows are used as they are: no series wrapper.' });

  const definition = defineChart({
    marks: [barY(alphabet, { x: 'letter', y: 'frequency' })],
    scales: {
      x: { scale: scaleBand },
      y: { scale: scaleLinear, nice: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Letter frequency' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
