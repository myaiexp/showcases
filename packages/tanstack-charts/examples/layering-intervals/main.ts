// Intervals: an area with y1/y2 and bars with y1/y2 both span two values instead of starting at zero
import { areaY, barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const lows = [-2, 0, 4, 9, 14, 18, 21, 20];
const rows = months.map((month, i) => ({ month, minimum: lows[i]!, maximum: lows[i]! + 7 + (i % 3) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: areaY with y1 and y2. Right: barY with y1 and y2.' });
  const right = stage.addBox();

  const area = defineChart({
    marks: [areaY(rows, { x: 'month', y1: 'minimum', y2: 'maximum', fill: '#fb923c', fillOpacity: 0.4 })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (C)' } },
    },
    tooltip,
  });
  const bars = defineChart({
    marks: [barY(rows, { x: 'month', y1: 'minimum', y2: 'maximum', fill: '#fb923c' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition: area, height: stage.height, ariaLabel: 'Temperature range area' }));
  stage.own(mountChart(right, { definition: bars, height: stage.height, ariaLabel: 'Temperature range bars' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
