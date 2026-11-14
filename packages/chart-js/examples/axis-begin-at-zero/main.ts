// A flat-looking line that is a 1.5-point change: beginAtZero shows the scale
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Orders delivered on time (%)',
          data: [96.1, 96.4, 96.0, 96.8, 97.2, 97.6, 97.5],
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.25),
          fill: true,
          tension: 0.25,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // linear.md: beginAtZero makes the scale include 0 if it is not already included.
      scales: { y: { beginAtZero: false } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const y = (): LinearScaleOptions => chart.options.scales!.y as LinearScaleOptions;

  const apply = (zero: boolean): void => {
    y().beginAtZero = zero;
    chart.update();
    label.textContent = `beginAtZero: ${zero}`;
  };
  apply(false);

  if (bar) toggle(bar, 'beginAtZero', false, apply);
  const stop = ctx.preview ? cycle([false, true], 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
