// Temperature line with a fixed 0 to 30 axis: ticks.stepSize sets the spacing
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

const STEPS = [10, 5, 2, 5];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Mean temperature (°C), Lisbon',
          data: CITY_WEATHER.Lisbon!.temp,
          borderColor: C.orange,
          backgroundColor: C.orange,
          tension: 0.3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // linear.md § Step Size: one tick per multiple of stepSize between min and max.
      scales: { y: { min: 0, max: 30, ticks: { stepSize: 5 } } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const y = (): LinearScaleOptions => chart.options.scales!.y as LinearScaleOptions;

  const apply = (step: number): void => {
    y().ticks.stepSize = step;
    chart.update();
    label.textContent = `ticks.stepSize: ${step}`;
  };
  apply(5);

  if (bar) slider(bar, 'ticks.stepSize', [1, 15, 1], 5, apply);
  const stop = ctx.preview ? cycle(STEPS, 2000, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
