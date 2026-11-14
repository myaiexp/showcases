// Hours of sleep per weekday: one bar per category, a new week each time
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const WEEKS = [
  [7.2, 6.8, 7.5, 6.4, 6.9, 8.6, 8.1],
  [6.1, 6.4, 5.9, 6.6, 6.2, 9.1, 8.4],
  [7.8, 7.6, 7.9, 7.4, 7.1, 7.7, 7.9],
  [5.5, 6.0, 6.3, 5.8, 6.5, 8.8, 9.3],
];
const NAMES = WEEKS.map((_, i) => `Week ${i + 1}`);
const average = (week: number[]): string => (week.reduce((a, b) => a + b, 0) / week.length).toFixed(1);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // bar.md: a bar chart needs labels (the categories) and one dataset of numbers.
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [
        {
          label: 'Hours asleep',
          data: WEEKS[0]!,
          backgroundColor: alpha(C.blue, 0.6),
          borderColor: C.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, suggestedMax: 10, title: { display: !ctx.preview, text: 'Hours' } } },
      plugins: { legend: { display: false } },
    },
  });

  // Swapping the numbers and calling update() animates the bars to their new heights.
  const show = (i: number): void => {
    chart.data.datasets[0]!.data = WEEKS[i]!;
    chart.update();
    label.textContent = `${NAMES[i]}: average ${average(WEEKS[i]!)} h`;
  };
  show(0);

  if (bar) select(bar, 'Week', NAMES, NAMES[0]!, (v) => show(NAMES.indexOf(v)));
  const stop = ctx.preview ? cycle(WEEKS, 2200, (_, i) => show(i)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
