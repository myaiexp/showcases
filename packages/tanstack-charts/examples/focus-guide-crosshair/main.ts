// Both rules on one focusGuideX mark make a crosshair, with a label on each axis edge
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusGuideX } from '@tanstack/charts/focus/guide';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The crosshair has a month label under it and a value label beside it.' });

  const definition = defineChart({
    marks: [
      lineY(sensorA, { id: 'sensor', x: 'month', y: 'value', key: 'id', points: true }),
      focusGuideX(sensorA, {
        id: 'crosshair',
        x: 'month',
        y: 'value',
        key: 'id',
        // focusGuideX enables xRule; adding yRule makes the pair a crosshair.
        yRule: { strokeOpacity: 0.5 },
        marker: { radius: 5 },
        xLabel: { format: (month) => `M${month + 1}` },
        yLabel: { format: (value) => String(value) },
      }),
    ],
    scales: {
      x: { scale: scaleLinear },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sensor readings with a crosshair' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
