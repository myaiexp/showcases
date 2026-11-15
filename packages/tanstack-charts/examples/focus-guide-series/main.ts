// A focus guide with z keeps one marker per series on a two-series chart
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusGuideX } from '@tanstack/charts/focus/guide';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { readings } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each series gets its own dot, taking its color from the series.' });

  const definition = defineChart({
    focus: 'group-x',
    marks: [
      lineY(readings, { id: 'readings', x: 'month', y: 'value', z: 'series', key: 'id', points: true }),
      focusGuideX(readings, {
        id: 'cursor',
        x: 'month',
        y: 'value',
        z: 'series',
        key: 'id',
        match: 'group',
        marker: { radius: 5 },
        xLabel: { format: (month) => `Month ${month + 1}` },
      }),
    ],
    scales: {
      x: { scale: scaleLinear },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Two sensors with a grouped focus guide' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
