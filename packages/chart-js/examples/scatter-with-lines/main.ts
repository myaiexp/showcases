// A delivery round as scatter points: showLine joins them in list order
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

// Stops in delivery order, as map coordinates in km. The order is not sorted by x,
// which is what makes this a path and not a line chart.
const STOPS = [
  { x: 1, y: 2 },
  { x: 3.5, y: 5 },
  { x: 2, y: 8 },
  { x: 6, y: 9 },
  { x: 8.5, y: 6.5 },
  { x: 6.5, y: 4 },
  { x: 9, y: 2 },
  { x: 5, y: 1 },
  { x: 1, y: 2.3 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Delivery round',
          data: STOPS,
          // Scatter hides the line by default (scatter.md); line.md's showLine turns it on.
          showLine: true,
          tension: 0,
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.9),
          borderWidth: 2.5,
          pointRadius: 5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: 0, max: 10, title: { display: !ctx.preview, text: 'East (km)' } },
        y: { min: 0, max: 10, title: { display: !ctx.preview, text: 'North (km)' } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (t) => `Stop ${t.dataIndex + 1}: ${t.parsed.x} km east, ${t.parsed.y} km north` } },
      },
    },
  });

  const setLine = (on: boolean): void => {
    chart.data.datasets[0]!.showLine = on;
    chart.update();
    label.textContent = `showLine: ${on}`;
  };
  setLine(true);

  if (bar) {
    toggle(bar, 'showLine', true, setLine);
    slider(bar, 'tension', [0, 0.5, 0.05], 0, (v) => {
      chart.data.datasets[0]!.tension = v;
      chart.update();
    });
  }
  let on = true;
  const stop = ctx.preview ? every(2000, () => setLine((on = !on))) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
