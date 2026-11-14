// Bar width: barPercentage inside a slot, categoryPercentage of the slot
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 160 });
  const label = caption(el);
  let barPct = 0.9;
  let catPct = 0.8;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        { label: 'Lunch', data: [62, 71, 58, 80, 94], backgroundColor: alpha(C.blue, 0.75), borderColor: C.blue, borderWidth: 1 },
        { label: 'Dinner', data: [48, 52, 66, 73, 120], backgroundColor: alpha(C.amber, 0.75), borderColor: C.amber, borderWidth: 1 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, suggestedMax: 130 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // bar.md § barPercentage vs categoryPercentage: categoryPercentage is the share of a
  // day's slot that all its bars together use; barPercentage is each bar's share of that.
  const apply = (): void => {
    for (const ds of chart.data.datasets) {
      ds.barPercentage = barPct;
      ds.categoryPercentage = catPct;
    }
    chart.update();
    label.textContent = `barPercentage: ${barPct}, categoryPercentage: ${catPct}`;
  };
  apply();

  if (bar) {
    slider(bar, 'barPercentage', [0.1, 1, 0.05], barPct, (v) => ((barPct = v), apply()));
    slider(bar, 'categoryPercentage', [0.1, 1, 0.05], catPct, (v) => ((catPct = v), apply()));
  }
  const steps: [number, number][] = [[0.9, 0.8], [0.4, 0.8], [1, 1], [1, 0.4], [0.5, 1]];
  const stop = ctx.preview ? cycle(steps, 2200, ([b, c]) => ((barPct = b), (catPct = c), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
