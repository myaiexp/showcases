// A temperature band: the high line fills down to the low line
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const MODES = ['+2', '+1', '2', 'false'] as const;
type Mode = (typeof MODES)[number];
const value = (m: Mode): string | number | false => (m === 'false' ? false : m === '2' ? 2 : m);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // Dataset 0 is the high, 1 the average, 2 the low.
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'High', data: [24, 26, 29, 27, 23, 21, 25], borderColor: C.red, backgroundColor: alpha(C.red, 0.3), fill: '+2', tension: 0.3, pointRadius: 0 },
        { label: 'Average', data: [19, 20, 23, 21, 18, 17, 20], borderColor: C.amber, borderDash: [5, 4], tension: 0.3, pointRadius: 0 },
        { label: 'Low', data: [13, 15, 17, 16, 13, 12, 15], borderColor: C.blue, tension: 0.3, pointRadius: 0 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 8, max: 32 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // area.md § Filling modes: '+2' means "the dataset two places after this one", a number
  // is an absolute index, '+1' targets the next dataset (here the average).
  const setFill = (m: Mode): void => {
    chart.data.datasets[0]!.fill = value(m);
    chart.update();
    label.textContent = `High line: fill: ${m === '+2' || m === '+1' ? `'${m}'` : m}`;
  };
  setFill('+2');

  if (bar) select(bar, 'fill of the High line', MODES, '+2', setFill);
  const stop = ctx.preview ? cycle(MODES, 2000, setFill) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
