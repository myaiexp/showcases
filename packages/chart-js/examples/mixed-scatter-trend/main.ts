// Scatter points plus a line dataset that draws their trend, in one mixed chart
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha, seeded } from '../../shared/data.ts';
import { trendLine } from '../../shared/round-charts-data.ts';

/** 30 students: hours studied across, exam score up. `slope` is points gained per hour. */
function sample(rand: () => number, slope: number): { x: number; y: number }[] {
  return Array.from({ length: 30 }, () => {
    const x = Math.round((1 + rand() * 14) * 10) / 10;
    const y = Math.max(5, Math.min(100, 38 + slope * x + (rand() + rand() - 1) * 28));
    return { x, y: Math.round(y) };
  });
}

const SLOPES = [3.2, 0.8, 4.4];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const rand = seeded(5);
  let points = sample(rand, SLOPES[0]!);

  // Chart type 'scatter', and one dataset overrides it with type 'line' (mixed.md).
  // The line is just two points: the ends of the fitted trend.
  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Students', data: points, backgroundColor: alpha(C.blue, 0.7), pointRadius: ctx.preview ? 3 : 5 },
        {
          type: 'line',
          label: 'Trend',
          data: trendLine(points),
          borderColor: C.amber,
          borderWidth: 3,
          pointRadius: 0,
          borderDash: [8, 5],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: 0, max: 16, title: { display: !ctx.preview, text: 'Hours studied' } },
        y: { min: 0, max: 110, title: { display: !ctx.preview, text: 'Exam score' } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const draw = (slope: number): void => {
    points = sample(rand, slope);
    chart.data.datasets[0]!.data = points;
    chart.data.datasets[1]!.data = trendLine(points);
    chart.update();
    label.textContent = slope < 2 ? 'little link between study and score' : 'more study, higher score';
  };
  draw(SLOPES[0]!);

  if (bar) {
    button(bar, 'New students', () => draw(SLOPES[Math.floor(rand() * SLOPES.length)]!));
    toggle(bar, 'Show trend', true, (on) => {
      chart.setDatasetVisibility(1, on);
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(SLOPES, 2600, draw) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
