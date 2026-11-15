// focusGuideY: a horizontal rule at the focused value, with a label on the y axis edge
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusGuideY } from '@tanstack/charts/focus/guide';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The horizontal rule sits at the focused reading; its label shows the value.' });

  const definition = defineChart({
    marks: [
      lineY(sensorA, { id: 'sensor', x: 'month', y: 'value', key: 'id', points: true }),
      focusGuideY(sensorA, {
        id: 'level',
        x: 'month',
        y: 'value',
        key: 'id',
        yRule: { strokeDasharray: '4 3' },
        marker: { radius: 5 },
        yLabel: { format: (value) => `${value} units` },
      }),
    ],
    scales: {
      x: { scale: scaleLinear },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sensor readings with a horizontal focus guide' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
