// A thermostat setting holds until the next change: the four stepped modes
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

const MODES = ['false', 'true', 'before', 'after', 'middle'] as const;
type Mode = (typeof MODES)[number];
const value = (m: Mode): boolean | 'before' | 'after' | 'middle' => (m === 'false' ? false : m === 'true' ? true : m);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['6:00', '8:00', '10:00', '14:00', '17:00', '19:00', '22:00', '23:30'],
      datasets: [
        {
          label: 'Heating setpoint (°C)',
          data: [16, 21, 18, 18, 22, 21, 17, 16],
          borderColor: C.red,
          borderWidth: 2,
          pointBackgroundColor: C.red,
          pointRadius: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 14, max: 24 } },
      plugins: { legend: { display: false } },
    },
  });

  // line.md § Stepped: the line jumps instead of sloping. 'before' steps at the start of
  // each interval, 'after' at the end, 'middle' halfway; true is the same as 'before'.
  const setMode = (m: Mode): void => {
    chart.data.datasets[0]!.stepped = value(m);
    chart.update();
    label.textContent = `stepped: ${m === 'before' || m === 'after' || m === 'middle' ? `'${m}'` : m}`;
  };
  setMode('false');

  if (bar) select(bar, 'stepped', MODES, 'false', setMode);
  const stop = ctx.preview ? cycle(MODES, 1800, setMode) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
