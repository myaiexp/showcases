// Profit and loss: negative bars hang below, `base` moves the baseline
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const PROFIT = [12, 18, -7, -14, 5, 22, 31, 9, -4, 16, 27, -9];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let base = 0;

  // Scriptable colours (options.md): the function runs per bar and picks green or red by
  // comparing the bar's value with the current baseline.
  const colour = (c: { parsed: { y: number | null } }, a: number): string =>
    (c.parsed.y ?? 0) >= base ? alpha(C.green, a) : alpha(C.red, a);
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Profit (k€)',
          data: PROFIT,
          base: 0,
          backgroundColor: (c) => colour(c, 0.65),
          borderColor: (c) => colour(c, 1),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { grace: '10%' } },
      plugins: { legend: { display: false } },
    },
  });

  // bar.md § General: `base` is the value, in data units, where bars start. Values above
  // it grow upward and values below it grow downward.
  const setBase = (v: number): void => {
    base = v;
    chart.data.datasets[0]!.base = v;
    chart.update();
    label.textContent = `base: ${v}`;
  };
  setBase(0);

  if (bar) slider(bar, 'base', [-20, 30, 1], 0, setBase);
  const stop = ctx.preview ? cycle([0, 15, -10, 0], 2200, setBase) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
