// Where an area ends: the axis start, its end, zero, or any value you pick
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const MODES = ['start', 'end', 'origin', 'value: 30'] as const;
type Mode = (typeof MODES)[number];
const value = (m: Mode): 'start' | 'end' | 'origin' | { value: number } => (m === 'value: 30' ? { value: 30 } : m);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Stock level',
          data: [34, 46, 28, 52, 41, 58, 37, 49],
          borderColor: C.purple,
          backgroundColor: alpha(C.purple, 0.4),
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 2,
          fill: 'start',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // A range from -20 to 70 keeps 'start', 'origin' (zero) and 'end' all in different places.
      scales: { y: { min: -20, max: 70 } },
      plugins: { legend: { display: false } },
    },
  });

  // area.md § Filling modes: boundaries are 'start' and 'end' of the axis and 'origin'
  // (zero); { value: n } fills to any number on the axis.
  const setFill = (m: Mode): void => {
    chart.data.datasets[0]!.fill = value(m);
    chart.update();
    label.textContent = m === 'value: 30' ? 'fill: { value: 30 }' : `fill: '${m}'`;
  };
  setFill('start');

  if (bar) select(bar, 'fill', MODES, 'start', setFill);
  const stop = ctx.preview ? cycle(MODES, 2000, setFill) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
