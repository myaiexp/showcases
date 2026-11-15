// focusGuideX: a vertical rule and a marker that follow the focused point of a line
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusGuideX } from '@tanstack/charts/focus/guide';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the chart: the rule and dot snap to the nearest month.' });

  const definition = defineChart({
    marks: [
      lineY(sensorA, { id: 'sensor', x: 'month', y: 'value', key: 'id', points: true }),
      // The guide reads the same rows and channels as the line, but draws only for the focused row.
      focusGuideX(sensorA, { id: 'cursor', x: 'month', y: 'value', key: 'id', marker: { radius: 6 } }),
    ],
    scales: {
      x: { scale: scaleLinear, grid: false },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sensor readings with a focus guide' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
