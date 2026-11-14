// Rainfall above, temperature below: two y axes stacked in one column, one x
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

const WEIGHTS = [1, 2, 3, 1];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { height: 460, previewHeight: 180 });
  const label = caption(el);

  const w = CITY_WEATHER.Helsinki!;
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Temperature (°C)', data: w.temp, yAxisID: 'temp', borderColor: C.orange, backgroundColor: C.orange, tension: 0.3 },
        { type: 'bar', label: 'Rainfall (mm)', data: w.rain, yAxisID: 'rain', backgroundColor: alpha(C.blue, 0.6) },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        // cartesian/index.md: axes at the same position with the same `stack` share the
        // column; stackWeight sets each one's share of the height.
        temp: { type: 'linear', position: 'left', stack: 'weather', stackWeight: 2, offset: false, title: { display: true, text: '°C' } },
        rain: { type: 'linear', position: 'left', stack: 'weather', stackWeight: 1, offset: false, beginAtZero: true, title: { display: true, text: 'mm' } },
      },
      plugins: { legend: { display: false } },
    },
  });
  const rain = (): LinearScaleOptions => chart.options.scales!.rain as LinearScaleOptions;
  const temp = (): LinearScaleOptions => chart.options.scales!.temp as LinearScaleOptions;

  const weight = (v: number): void => {
    rain().stackWeight = v;
    chart.update();
    label.textContent = `rain stackWeight ${v} (temp 2)`;
  };
  weight(1);

  if (bar) {
    slider(bar, 'Rain band stackWeight', [1, 6, 1], 1, weight);
    toggle(bar, 'offset (pad each band)', false, (v) => {
      rain().offset = v;
      temp().offset = v;
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(WEIGHTS, 2000, weight) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
