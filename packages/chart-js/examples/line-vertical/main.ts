// Temperature up a mountain: indexAxis: 'y' makes the line run top to bottom
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

// Altitude on the index axis, highest first so the summit is at the top.
const ALTITUDES = ['3000 m', '2500 m', '2000 m', '1500 m', '1000 m', '500 m', '0 m'];
const SEASONS: Record<string, number[]> = {
  Summer: [-1, 2, 6, 10, 15, 19, 24],
  Winter: [-19, -15, -11, -8, -4, -1, 2],
};
type Season = 'Summer' | 'Winter';
const NAMES: Season[] = ['Summer', 'Winter'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // line.md § Vertical Line Chart: with indexAxis 'y' the labels run down the left and
  // the values spread along the bottom, so options set on `x` now apply to the values.
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ALTITUDES,
      datasets: [
        {
          label: 'Air temperature (°C)',
          data: [...SEASONS.Summer!],
          borderColor: C.cyan,
          backgroundColor: C.cyan,
          borderWidth: 2.5,
          pointRadius: 4,
          tension: 0.25,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: { x: { min: -25, max: 30, title: { display: !ctx.preview, text: '°C' } } },
      plugins: { legend: { display: false } },
    },
  });

  const show = (s: Season): void => {
    chart.data.datasets[0]!.data = [...SEASONS[s]!];
    chart.update();
    label.textContent = `${s}: indexAxis: 'y'`;
  };
  show('Summer');

  if (bar) select(bar, 'Season', NAMES, 'Summer', show);
  const stop = ctx.preview ? cycle(NAMES, 2400, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
