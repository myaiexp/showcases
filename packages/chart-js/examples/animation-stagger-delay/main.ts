// Bars start growing one after another because animation.delay is a function
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, select, slider } from '../../shared/controls.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';

type Order = 'together' | 'left to right' | 'by series' | 'both';
const ORDERS: readonly Order[] = ['together', 'left to right', 'by series', 'both'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);

  let order: Order = 'left to right';
  let step = 120; // milliseconds between neighbours

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(3) },
    options: {
      maintainAspectRatio: false,
      animation: {
        // animations.md § animation: delay is scriptable. The context carries dataIndex
        // and datasetIndex; options.md says to check `type`, since the function is also
        // called for non-data parts of the chart.
        delay: (c) => {
          if (c.type !== 'data') return 0;
          const byBar = order === 'left to right' || order === 'both' ? c.dataIndex * step : 0;
          const bySeries = order === 'by series' || order === 'both' ? c.datasetIndex * step * 4 : 0;
          return byBar + bySeries;
        },
      },
      scales: { y: { beginAtZero: true, max: 700 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // The function reads `order` and `step` when the animation starts, so replay after a change.
  const replay = (): void => {
    note.textContent = `delay by: ${order}`;
    chart.reset();
    chart.update();
  };

  if (bar) {
    select(bar, 'Start', ORDERS, order, (v) => {
      order = v;
      replay();
    });
    slider(bar, 'Gap (ms)', [0, 400, 10], step, (v) => {
      step = v;
    });
    button(bar, 'Replay', replay);
  }
  note.textContent = `delay by: ${order}`;
  const stop = ctx.preview
    ? cycle(ORDERS, 3200, (o) => {
        order = o;
        replay();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
