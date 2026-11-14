// A radar grid as polygons or round rings, chosen with grid.circular
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { CAFE, CAFE_LABELS } from '../../shared/round-charts-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: CAFE_LABELS,
      datasets: [
        {
          label: 'Rating (1 to 5)',
          data: CAFE,
          fill: true,
          backgroundColor: alpha(C.cyan, 0.25),
          borderColor: C.cyan,
          pointBackgroundColor: C.cyan,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, display: !ctx.preview },
          // false (default): straight lines between the labels; true: round rings.
          grid: { circular: false },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
  // Read scales.r on every change: update() re-merges the scale options into new objects.
  const r = (): RadialLinearScaleOptions => chart.options.scales!.r as RadialLinearScaleOptions;

  const setCircular = (on: boolean): void => {
    r().grid.circular = on;
    chart.update();
    label.textContent = `grid.circular: ${on}`;
  };
  setCircular(false);

  if (bar) toggle(bar, 'grid.circular', false, setCircular);
  let on = false;
  const stop = ctx.preview ? every(2000, () => setCircular((on = !on))) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
