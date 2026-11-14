// Temperature vs a comfort line: red shading above it, blue below
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // area.md: `fill` can be an object. `target` is where the area ends (here a value on the
  // axis); `above` and `below` are the colours used on either side of that target.
  const fillAt = (value: number) => ({
    target: { value },
    above: alpha(C.red, 0.4),
    below: alpha(C.blue, 0.4),
  });
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
      datasets: [
        {
          label: 'Room temperature (°C)',
          data: [18, 17, 17, 20, 24, 27, 25, 22, 19],
          borderColor: C.grey,
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
          fill: fillAt(21),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 12, max: 30 } },
      plugins: { legend: { display: false } },
    },
  });

  const setLevel = (v: number): void => {
    chart.data.datasets[0]!.fill = fillAt(v);
    chart.update();
    label.textContent = `fill.target: { value: ${v} }`;
  };
  setLevel(21);

  if (bar) slider(bar, 'target value (°C)', [14, 28, 1], 21, setLevel);
  const stop = ctx.preview ? cycle([21, 16, 25, 19, 23], 1800, setLevel) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
