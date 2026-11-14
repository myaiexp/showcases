// Monthly temperature with the area between the line and zero filled
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const MODES = ['false', 'origin', 'true'] as const;
type Mode = (typeof MODES)[number];
const value = (m: Mode): boolean | 'origin' => (m === 'false' ? false : m === 'true' ? true : m);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Average temperature (°C)',
          data: [-6, -5, -1, 5, 11, 15, 18, 16, 11, 5, 0, -4],
          borderColor: C.cyan,
          backgroundColor: alpha(C.cyan, 0.35),
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: -10, max: 22 } },
      plugins: { legend: { display: false } },
    },
  });

  // area.md § Filling modes: 'origin' fills to the zero line, so months below zero fill
  // upward; true is the older spelling of 'origin'; false turns the fill off.
  const setFill = (m: Mode): void => {
    chart.data.datasets[0]!.fill = value(m);
    chart.update();
    label.textContent = `fill: ${m === 'origin' ? "'origin'" : m}`;
  };
  setFill('false');

  if (bar) select(bar, 'fill', MODES, 'false', setFill);
  const stop = ctx.preview ? cycle(['origin', 'false', 'true'] as const, 2000, setFill) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
