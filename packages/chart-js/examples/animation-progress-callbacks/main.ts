// A progress bar fills as the chart animates, using onProgress and onComplete
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);

  // The page-side progress bar that the chart's callbacks drive.
  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '10px', alignItems: 'center', width: '100%', font: '12px ui-monospace, monospace' });
  const progress = document.createElement('progress');
  progress.max = 1;
  progress.value = 0;
  progress.style.flex = '1';
  const status = document.createElement('span');
  status.style.minWidth = '9ch';
  row.append(progress, status);
  el.append(row);
  const stage = createStage(el, ctx, { previewHeight: 166 });

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Revenue (k€)',
          data: [41, 44, 52, 58, 63, 71, 78, 74, 69, 81, 92, 104],
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.25),
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animation: {
        duration: ctx.preview ? 2500 : 2000,
        // animations.md § Animation Callbacks: currentStep counts up to numSteps.
        onProgress: ({ currentStep, numSteps }) => {
          progress.value = currentStep / numSteps;
          status.textContent = `${Math.round((currentStep / numSteps) * 100)}%`;
        },
        onComplete: () => {
          progress.value = 1;
          status.textContent = 'complete';
        },
      },
      scales: { y: { beginAtZero: true, max: 120 } },
      plugins: { legend: { display: false } },
    },
  });

  const replay = (): void => {
    chart.reset();
    chart.update();
  };
  if (bar) {
    slider(bar, 'Duration (ms)', [300, 5000, 100], 2000, (v) => {
      chart.options.animation = { ...(chart.options.animation || {}), duration: v };
    });
    button(bar, 'Replay', replay);
  }
  const stop = ctx.preview ? every(4200, replay) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
