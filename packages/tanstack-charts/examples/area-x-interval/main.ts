// areaX with x1/x2 edges along a vertical y axis
import { areaX, defineChart, lineX, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 30 }, (_, i) => {
  const mean = 8 + 5 * Math.sin(i / 6);
  return { day: i + 1, min: Math.round((mean - 3 - (i % 4)) * 10) / 10, max: Math.round((mean + 3 + (i % 3)) * 10) / 10, mean: Math.round(mean * 10) / 10 };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      areaX(rows, { y: 'day', x1: 'min', x2: 'max', fillOpacity: 0.3 }),
      lineX(rows, { y: 'day', x: 'mean' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (°C)' } },
      y: { scale: scaleLinear, reverse: true, axis: { label: 'Day' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Daily temperature range' }));
  return () => stage.dispose();
};

export default mount;
