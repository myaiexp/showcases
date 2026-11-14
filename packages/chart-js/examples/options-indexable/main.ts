// Steps per weekday with an array of colours: bar i takes colour i, looping
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { PALETTE, WEEKDAYS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Steps (thousands)', data: [8.2, 6.9, 9.4, 7.1, 10.3, 12.8, 5.6], borderWidth: 1 }],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });

  // options.md § Indexable Options: with fewer colours than bars the list loops.
  const apply = (n: number): void => {
    const ds = chart.data.datasets[0]!;
    ds.backgroundColor = PALETTE.slice(0, n).map((c) => alpha(c, 0.65));
    ds.borderColor = PALETTE.slice(0, n);
    chart.update();
    label.textContent = `backgroundColor: [${n} colour${n === 1 ? '' : 's'}] for 7 bars`;
  };
  apply(7);

  if (bar) slider(bar, 'colours in the list', [1, 8, 1], 7, apply);
  const stop = ctx.preview ? cycle([3, 2, 5, 1, 7], 1700, (n) => apply(n)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
