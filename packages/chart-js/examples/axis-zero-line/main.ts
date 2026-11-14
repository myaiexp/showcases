// Monthly temperature with the freezing line picked out by a scriptable grid colour
import type { Mount } from '@/types.ts';
import { Chart, GRID, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

const LEVELS = [0, 10, -5, 15, 0];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  let level = 0;
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Mean temperature (°C), Helsinki',
          data: CITY_WEATHER.Helsinki!.temp,
          backgroundColor: CITY_WEATHER.Helsinki!.temp.map((t) => alpha(t < 0 ? C.blue : C.orange, 0.7)),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: { stepSize: 5 },
          grid: {
            // styling.md: grid.color and lineWidth are scriptable; the context has the tick.
            color: (c) => (c.tick.value === level ? C.amber : GRID),
            lineWidth: (c) => (c.tick.value === level ? 3 : 1),
          },
        },
      },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (v: number): void => {
    level = v;
    chart.update();
    label.textContent = `highlighted grid line: ${v}°C`;
  };
  apply(0);

  if (bar) slider(bar, 'Highlight line at (°C)', [-5, 15, 5], 0, apply);
  const stop = ctx.preview ? cycle(LEVELS, 1800, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
