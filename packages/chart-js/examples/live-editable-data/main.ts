// Monthly sales you can edit: change, add or remove months and the bars animate
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha, numbers, seeded } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx);
  const rand = seeded(7);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [
        {
          label: 'Sales (k€)',
          data: numbers(6, 30, 90, rand),
          backgroundColor: alpha(C.blue, 0.6),
          borderColor: C.blue,
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, suggestedMax: 100 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const values = chart.data.datasets[0]!.data as number[];
  const labels = chart.data.labels as string[];

  // updates.md § Adding or Removing Data: change the arrays, then call update().
  const addMonth = (): void => {
    if (labels.length >= MONTHS.length) return;
    labels.push(MONTHS[labels.length]!);
    values.push(Math.round(30 + rand() * 60));
    chart.update();
  };
  const removeMonth = (): void => {
    if (labels.length <= 1) return;
    labels.pop();
    values.pop();
    chart.update();
  };
  const shuffle = (): void => {
    for (let i = 0; i < values.length; i++) values[i] = Math.round(20 + rand() * 75);
    chart.update();
  };

  if (bar) {
    button(bar, 'Add month', addMonth);
    button(bar, 'Remove month', removeMonth);
    button(bar, 'New figures', shuffle);
    slider(bar, 'Last month', [0, 100, 1], values.at(-1) ?? 0, (v) => {
      values[values.length - 1] = v;
      chart.update();
    });
  }

  // A card has no buttons, so it grows the year, then starts over with new figures.
  let step = 0;
  const stop = ctx.preview
    ? every(1600, () => {
        step++;
        if (labels.length < MONTHS.length) addMonth();
        else if (step % 8 === 0) {
          while (labels.length > 6) removeMonth();
          shuffle();
        }
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
