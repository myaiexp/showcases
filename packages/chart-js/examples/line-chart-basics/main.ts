// Daily temperature as a line: a new day scrolls in on the right
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, alpha, seeded } from '../../shared/data.ts';

const WINDOW = 10;
const rand = seeded(11);
// A made-up November: a slow drift plus a little noise, in °C.
const SERIES = Array.from({ length: 60 }, (_, i) => Math.round((8 + 5 * Math.sin(i / 6) + (rand() - 0.5) * 4) * 10) / 10);
const dayLabel = (i: number): string => `Nov ${(i % 30) + 1}`;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let next = WINDOW;

  // line.md: a line chart takes the same labels + numbers as a bar chart; each number
  // becomes a point and the points are joined.
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: Array.from({ length: WINDOW }, (_, i) => dayLabel(i)),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: SERIES.slice(0, WINDOW),
          borderColor: C.orange,
          backgroundColor: alpha(C.orange, 0.5),
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { suggestedMin: 0, suggestedMax: 16, title: { display: !ctx.preview, text: '°C' } } },
      plugins: { legend: { display: false } },
    },
  });

  // Dropping the oldest day and pushing a new one makes the line scroll (updates.md).
  const addDay = (): void => {
    chart.data.labels!.shift();
    chart.data.datasets[0]!.data.shift();
    chart.data.labels!.push(dayLabel(next));
    chart.data.datasets[0]!.data.push(SERIES[next % SERIES.length]!);
    label.textContent = `${dayLabel(next)}: ${SERIES[next % SERIES.length]} °C`;
    next++;
    chart.update();
  };
  label.textContent = `${dayLabel(WINDOW - 1)}: ${SERIES[WINDOW - 1]} °C`;

  if (bar) button(bar, 'Next day', addDay);
  const stop = ctx.preview ? every(1300, addDay) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
