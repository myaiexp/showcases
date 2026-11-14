// Weigh-ins on uneven dates: the time axis spaces them by the days between them
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

const DAY = 86_400_000;
const START = Date.parse('2026-01-03T00:00:00Z');
// Day offsets of the readings: a burst of daily ones, then long gaps.
const GAPS = [0, 1, 2, 4, 5, 6, 20, 21, 41, 42, 43, 64];
const WEIGHT = [82.4, 82.1, 82.3, 81.6, 81.8, 81.2, 80.4, 80.6, 79.9, 79.7, 79.8, 78.9];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  let shown = 4;
  const readings = (): { x: number; y: number }[] =>
    GAPS.slice(0, shown).map((d, i) => ({ x: START + d * DAY, y: WEIGHT[i]! }));

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      datasets: [
        { label: 'Weight (kg)', data: readings(), borderColor: C.cyan, backgroundColor: C.cyan, pointRadius: 4, tension: 0.2 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // time.md: data are spread according to the time between points. The adapter reads
      // timestamps, so each point is {x: timestamp, y: value}.
      scales: { x: { type: 'time', time: { tooltipFormat: 'EEE d MMM' } }, y: { suggestedMin: 78, suggestedMax: 83 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const show = (n: number): void => {
    shown = n;
    chart.data.datasets[0]!.data = readings();
    chart.update();
    label.textContent = `${n} readings, spaced by date`;
  };
  show(shown);
  const next = (): void => show(shown >= GAPS.length ? 4 : shown + 1);

  if (bar) {
    button(bar, 'Add next reading', next);
    button(bar, 'Start over', () => show(4));
  }
  const stop = ctx.preview ? every(1500, next) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
