// differenceY: shaded lobes between a comparison line and a primary line
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { forecastVsActual } from '../../shared/marks1-compare.ts';
import { createStage } from '../../shared/stage.ts';

const rows = forecastVsActual();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover: the tooltip tells the forecast line from the actual line.' });

  const definition = defineChart({
    marks: [differenceY(rows, { x: 'day', y1: 'forecast', y2: 'actual', positiveFill: '#16a34a', negativeFill: '#dc2626', fillOpacity: 0.3 })],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Day' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Orders' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Actual orders against forecast' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
