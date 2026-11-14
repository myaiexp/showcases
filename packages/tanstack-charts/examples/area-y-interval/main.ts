// areaY with explicit y1/y2 boundaries plus a lineY layer for the middle estimate
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 20 }, (_, i) => {
  const mid = 20 + i * 1.6 + 4 * Math.sin(i / 2.5);
  const spread = 2 + i * 0.5;
  return { month: i + 1, low: Math.round((mid - spread) * 10) / 10, mid: Math.round(mid * 10) / 10, high: Math.round((mid + spread) * 10) / 10 };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover: the points sit on the upper boundary, y2.' });

  const definition = defineChart({
    marks: [
      areaY(rows, { x: 'month', y1: 'low', y2: 'high', fillOpacity: 0.25 }),
      lineY(rows, { x: 'month', y: 'mid' }),
    ],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Forecast' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Forecast band between low and high' }));
  return () => stage.dispose();
};

export default mount;
