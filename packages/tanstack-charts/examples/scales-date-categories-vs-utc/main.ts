// Dates as categories ignore elapsed time (Friday and Monday sit side by side); scaleUtc keeps the weekend
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['2026-03-04', '2026-03-05', '2026-03-06', '2026-03-09', '2026-03-10', '2026-03-11'].map((d, i) => ({
  id: d,
  date: new Date(`${d}T00:00:00Z`),
  close: [101, 104, 103, 111, 109, 115][i]!,
}));
const dayName = new Intl.DateTimeFormat('en', { weekday: 'short', day: 'numeric', timeZone: 'UTC' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: dates as point-scale categories. Right: scaleUtc, so the weekend takes real space.' });
  const right = stage.addBox();
  const marks = [lineY(rows, { x: 'date', y: 'close' }), dot(rows, { x: 'date', y: 'close', r: 4 })] as const;

  const categorical = defineChart({
    marks,
    scales: {
      x: { scale: () => scalePoint<Date>().padding(0.3), axis: { label: 'scalePoint<Date>', ticks: { format: (d: Date) => dayName.format(d) } } },
      y: { scale: scaleLinear().domain([95, 120]), grid: true },
    },
    tooltip,
  });
  const temporal = defineChart({
    marks,
    scales: {
      x: { scale: scaleUtc, axis: { label: 'scaleUtc', ticks: { format: (d: Date) => dayName.format(d) } } },
      y: { scale: scaleLinear().domain([95, 120]), grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition: categorical, height: stage.height, ariaLabel: 'Dates as categories' }));
  stage.own(mountChart(right, { definition: temporal, height: stage.height, ariaLabel: 'Dates on a UTC scale' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
