// Monthly energy mix: bars stack when both scales say stacked: true
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const SOURCES = [
  { label: 'Solar', color: C.amber, data: [4, 6, 11, 16, 21, 24, 25, 22, 15, 9, 4, 3] },
  { label: 'Wind', color: C.cyan, data: [22, 20, 18, 15, 12, 10, 9, 11, 15, 19, 21, 24] },
  { label: 'Hydro', color: C.blue, data: [14, 13, 15, 18, 20, 17, 13, 11, 12, 13, 14, 15] },
  { label: 'Gas', color: C.grey, data: [30, 26, 20, 14, 9, 7, 8, 9, 13, 20, 27, 31] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: SOURCES.map((s) => ({
        label: s.label,
        data: s.data,
        backgroundColor: alpha(s.color, 0.75),
        borderColor: s.color,
        borderWidth: 1,
      })),
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true },
        y: { stacked: true, title: { display: !ctx.preview, text: 'GWh' } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // bar.md § Stacked Bar Chart: the same data, stacked or side by side, by one switch.
  const setStacked = (on: boolean): void => {
    chart.options.scales!.x!.stacked = on;
    chart.options.scales!.y!.stacked = on;
    chart.update();
    label.textContent = `stacked: ${on}`;
  };
  setStacked(true);

  if (bar) toggle(bar, 'stacked', true, setStacked);
  const stop = ctx.preview ? cycle([false, true], 2600, setStacked) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
