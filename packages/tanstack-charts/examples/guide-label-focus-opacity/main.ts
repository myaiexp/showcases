// tickLabels.opacity with focus: hide the tick label that matches the focused x value
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: its month label fades out of the axis.' });
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#2dd4bf' })],
    scales: {
      x: {
        scale: () => scaleBand<string>().padding(0.2),
        axis: { tickLabels: { opacity: ({ value, focus }) => (focus && Object.is(value, focus.primary.xValue) ? 0 : 1) } },
      },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue' }));
  stage.ghost();
  return () => stage.dispose();
};

export default mount;
