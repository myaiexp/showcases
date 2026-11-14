// Online and in-store sales for two years: stack ids make one stack per year
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const SERIES = [
  { label: 'Online 2025', stack: '2025', color: C.blue, data: [30, 34, 38, 52] },
  { label: 'In store 2025', stack: '2025', color: C.cyan, data: [48, 44, 46, 60] },
  { label: 'Online 2026', stack: '2026', color: C.amber, data: [41, 47, 55, 70] },
  { label: 'In store 2026', stack: '2026', color: C.orange, data: [45, 43, 44, 57] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: SERIES.map((s) => ({
        label: s.label,
        data: s.data,
        stack: s.stack,
        backgroundColor: alpha(s.color, 0.75),
        borderColor: s.color,
        borderWidth: 1,
      })),
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { stacked: true }, y: { stacked: true, title: { display: !ctx.preview, text: 'Sales (k€)' } } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // data-structures.md: `stack` names the group a dataset belongs to; each group is its own
  // stack. Without it every dataset lands in the one default stack.
  const setGroups = (on: boolean): void => {
    chart.data.datasets.forEach((d, i) => {
      d.stack = on ? SERIES[i]!.stack : 'all';
    });
    chart.update();
    label.textContent = on ? "stack: '2025' and '2026'" : "stack: 'all'";
  };
  setGroups(true);

  if (bar) toggle(bar, 'one stack per year', true, setGroups);
  const stop = ctx.preview ? cycle([false, true], 2600, setGroups) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
