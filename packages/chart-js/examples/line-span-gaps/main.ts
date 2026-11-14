// A sensor that dropped out twice: spanGaps bridges the gaps or not
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

// One reading missing at 11:00, three missing from 14:00 to 16:00.
const READINGS = [21.0, 21.4, null, 22.6, 23.1, null, null, null, 22.0, 21.2, 20.6];
const MODES = ['false', 'true'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: READINGS.map((_, i) => `${i + 9}:00`),
      datasets: [
        { label: 'Room temperature (°C)', data: READINGS, borderColor: C.blue, borderWidth: 2, pointRadius: 4, pointBackgroundColor: C.blue },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 19, max: 25 } },
      plugins: { legend: { display: false } },
    },
  });

  // line.md § Line Styling: false breaks the line at every null; true joins across them.
  // (A number only breaks the line where neighbouring points sit further apart than that
  // on the axis; it does not bridge nulls, so it has no effect on this data.)
  const setSpan = (m: Mode): void => {
    chart.data.datasets[0]!.spanGaps = m === 'true';
    chart.update();
    label.textContent = `spanGaps: ${m}`;
  };
  setSpan('false');

  if (bar) select(bar, 'spanGaps', MODES, 'false', setSpan);
  const stop = ctx.preview ? cycle(MODES, 2200, setSpan) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
