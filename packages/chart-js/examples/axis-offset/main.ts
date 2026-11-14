// Rainfall bars and a temperature line: offset adds room at the x axis ends
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const w = CITY_WEATHER.Lisbon!;
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [
        { label: 'Rainfall (mm)', data: w.rain.slice(0, 6), yAxisID: 'mm', backgroundColor: alpha(C.blue, 0.55), order: 2 },
        { type: 'line', label: 'Temperature (°C)', data: w.temp.slice(0, 6), yAxisID: 'celsius', borderColor: C.orange, backgroundColor: C.orange, order: 1 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { offset: true },
        mm: { position: 'left', display: false, beginAtZero: true },
        celsius: { position: 'right', display: false, min: 0, max: 30, grid: { drawOnChartArea: false } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const x = (): CartesianScaleOptions => chart.options.scales!.x as CartesianScaleOptions;

  // cartesian/index.md: offset adds extra space to both edges and fits the axis into
  // the chart area. Bars have it on by default; a line chart has it off.
  const apply = (offset: boolean): void => {
    x().offset = offset;
    chart.update();
    label.textContent = `offset: ${offset}`;
  };
  apply(true);

  if (bar) toggle(bar, 'offset', true, apply);
  const stop = ctx.preview ? cycle([false, true], 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
