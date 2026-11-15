// A named scale adds a second y axis on the right; the margin mark binds to it with yScale
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2026-01-01', 20);
const revenue = walk(rng(81), 20, 500, 20);
const margin = walk(rng(82), 20, 24, 1.1);
const revenueRows = dates.map((date, i) => ({ id: `r${i}`, date, value: revenue[i]! }));
const marginRows = dates.map((date, i) => ({ id: `m${i}`, date, percent: margin[i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two y scales with their own axes. Prefer small multiples when the series are unrelated.' });

  const definition = defineChart({
    marks: [
      lineY(revenueRows, { id: 'revenue', x: 'date', y: 'value', stroke: '#60a5fa', strokeWidth: 2 }),
      lineY(marginRows, { id: 'margin', x: 'date', y: 'percent', yScale: 'margin', stroke: '#fb923c', strokeWidth: 2 }),
    ],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue' } },
      margin: { channel: 'y', scale: scaleLinear, nice: true, side: 'right', axis: { label: 'Margin (%)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue and margin' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
