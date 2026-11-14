// Temperature ranges: each bar floats from the monthly low to the high
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

// [lowest, highest] average daily temperature per month, in °C.
const CITIES: Record<string, [number, number][]> = {
  Oslo: [[-7, -1], [-7, 0], [-4, 5], [1, 10], [6, 17], [10, 21], [13, 23], [12, 21], [8, 16], [3, 9], [-2, 3], [-5, 0]],
  Madrid: [[2, 10], [3, 13], [5, 16], [7, 19], [11, 23], [15, 29], [18, 33], [18, 32], [14, 27], [10, 20], [5, 14], [3, 10]],
  Cairo: [[9, 19], [10, 21], [12, 24], [15, 29], [18, 33], [21, 35], [23, 36], [23, 35], [21, 33], [18, 30], [14, 25], [10, 20]],
};
const NAMES = Object.keys(CITIES);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // A bar's data may be a [start, end] pair instead of one number (the bar chart's data
  // point type in chart.js's index.d.ts), which floats the bar between the two values.
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Temperature range (°C)',
          data: CITIES.Oslo!,
          backgroundColor: alpha(C.orange, 0.6),
          borderColor: C.orange,
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { title: { display: !ctx.preview, text: '°C' } } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => {
              const [lo, hi] = c.raw as [number, number];
              return `${lo} °C to ${hi} °C`;
            },
          },
        },
      },
    },
  });

  const show = (name: string): void => {
    chart.data.datasets[0]!.data = CITIES[name]!;
    chart.update();
    label.textContent = name;
  };
  show('Oslo');

  if (bar) select(bar, 'City', NAMES, 'Oslo', show);
  const stop = ctx.preview ? cycle(NAMES, 2400, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
