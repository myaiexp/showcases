// Two unrelated series: one dual-axis chart suggests a link, aligned small multiples do not
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2026-01-01', 30);
const sales = walk(rng(1), 30, 200, 8);
const rain = walk(rng(2), 30, 40, 3);
const salesRows = dates.map((date, i) => ({ id: `s${i}`, date, value: sales[i]! }));
const rainRows = dates.map((date, i) => ({ id: `r${i}`, date, value: rain[i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: dual axes with independent ranges. Right: the same series as two aligned panels.' });
  const right = stage.addBox();
  const panel = stage.addBox();

  const dual = defineChart({
    marks: [
      lineY(salesRows, { id: 'sales', x: 'date', y: 'value', stroke: '#60a5fa', strokeWidth: 2 }),
      lineY(rainRows, { id: 'rain', x: 'date', y: 'value', yScale: 'rain', stroke: '#fb923c', strokeWidth: 2 }),
    ],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, axis: { label: 'Sales' } },
      rain: { channel: 'y', scale: scaleLinear, nice: true, side: 'right', axis: { label: 'Rainfall' } },
    },
  });
  const panelChart = (rows: typeof salesRows, color: string, label: string) =>
    defineChart({
      marks: [lineY(rows, { x: 'date', y: 'value', stroke: color, strokeWidth: 2 })],
      scales: { x: { scale: scaleUtc, axis: false }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label } } },
    });
  void right;
  stage.own(mountChart(stage.box, { definition: dual, height: stage.height, ariaLabel: 'Sales and rainfall on dual axes' }));
  stage.own(mountChart(right, { definition: panelChart(salesRows, '#60a5fa', 'Sales'), height: stage.height / 2 - 4, ariaLabel: 'Sales panel' }));
  stage.own(mountChart(panel, { definition: panelChart(rainRows, '#fb923c', 'Rainfall'), height: stage.height / 2 - 4, ariaLabel: 'Rainfall panel' }));
  return () => stage.dispose();
};

export default mount;
