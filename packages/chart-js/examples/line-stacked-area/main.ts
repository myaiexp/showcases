// Website visits by source, stacked into one total that rises and falls
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const SOURCES = [
  { label: 'Search', color: C.blue, data: [40, 42, 45, 50, 52, 49, 46, 48, 55, 60, 63, 70] },
  { label: 'Social', color: C.pink, data: [12, 15, 14, 20, 28, 35, 30, 22, 18, 20, 24, 30] },
  { label: 'Email', color: C.green, data: [8, 9, 12, 11, 10, 9, 8, 10, 14, 16, 18, 25] },
  { label: 'Direct', color: C.amber, data: [20, 21, 20, 22, 23, 24, 22, 23, 25, 26, 27, 28] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: SOURCES.map((s) => ({
        label: s.label,
        data: s.data,
        borderColor: s.color,
        backgroundColor: alpha(s.color, 0.5),
        borderWidth: 1.5,
        pointRadius: 0,
        // area.md: 'stack' fills down to the line of the dataset stacked below this one.
        fill: 'stack',
      })),
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { stacked: true, title: { display: !ctx.preview, text: 'Visits (k)' } } },
      plugins: { legend: { display: !ctx.preview } },
      interaction: { mode: 'index', intersect: false },
    },
  });

  // line.md § Stacked Area Chart: stacking is one switch on the value axis.
  const setStacked = (on: boolean): void => {
    chart.options.scales!.y!.stacked = on;
    chart.update();
    label.textContent = `scales.y.stacked: ${on}`;
  };
  setStacked(true);

  if (bar) toggle(bar, 'stacked', true, setStacked);
  const stop = ctx.preview ? cycle([false, true], 2800, setStacked) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
