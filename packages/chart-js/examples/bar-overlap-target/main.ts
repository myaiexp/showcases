// Sales vs quota: grouped: false puts a slim bar over a wide target bar
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const REPS = ['Ana', 'Ben', 'Chen', 'Dara', 'Eli', 'Fay'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: REPS,
      datasets: [
        {
          label: 'Actual',
          data: [82, 64, 105, 47, 93, 71],
          order: 0, // lower order is drawn on top
          grouped: false,
          barPercentage: 0.45,
          backgroundColor: alpha(C.blue, 0.9),
          borderColor: C.blue,
          borderWidth: 1,
        },
        {
          label: 'Target',
          data: [90, 80, 90, 70, 90, 80],
          order: 1,
          grouped: false,
          barPercentage: 0.9,
          backgroundColor: alpha(C.grey, 0.28),
          borderColor: C.grey,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, suggestedMax: 120 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // bar.md § General: grouped true puts the datasets side by side in each slot; false
  // draws each bar on its own index value, so the two datasets sit on top of each other.
  const setGrouped = (on: boolean): void => {
    for (const ds of chart.data.datasets) ds.grouped = on;
    chart.update();
    label.textContent = `grouped: ${on}`;
  };
  setGrouped(false);

  if (bar) toggle(bar, 'grouped', false, setGrouped);
  const stop = ctx.preview ? cycle([true, false], 2600, setGrouped) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
