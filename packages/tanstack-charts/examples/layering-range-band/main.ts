// Range band composition: a filled area between low and high with a line on each edge
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from 'd3-scale';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { days, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(61);
const temperatures = days('2026-07-01', 30).map((date, i) => {
  const low = 54 + Math.round(3 * Math.sin(i / 4) + random() * 3);
  return { date, low, high: low + 11 + Math.round(random() * 6) };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a day: each line and the area report their own row.' });

  const definition = defineChart({
    marks: [
      areaY(temperatures, { id: 'daily-range', x: 'date', y1: 'low', y2: 'high', fill: '#60a5fa', fillOpacity: 0.24 }),
      lineY(temperatures, { id: 'daily-low', x: 'date', y: 'low', stroke: '#60a5fa', strokeWidth: 1.5 }),
      lineY(temperatures, { id: 'daily-high', x: 'date', y: 'high', stroke: '#f87171', strokeWidth: 1.5 }),
    ],
    scales: {
      x: { scale: scaleUtc, axis: { label: 'Day' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (F)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Daily temperature range' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
