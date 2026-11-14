// Café sales with closed days: skipNull keeps open bars full width
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

// null means the café was closed that day.
const CAFES = [
  { label: 'Harbour', color: C.blue, data: [220, 240, 260, 250, 380, 450, null] },
  { label: 'Station', color: C.amber, data: [410, 430, 400, 420, 390, null, null] },
  { label: 'Park', color: C.green, data: [null, null, 150, 170, 210, 520, 480] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: CAFES.map((s) => ({
        label: s.label,
        data: s.data,
        backgroundColor: alpha(s.color, 0.7),
        borderColor: s.color,
        borderWidth: 1,
      })),
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // bar.md § General: null values normally still reserve a bar-sized slot; with skipNull
  // true they are left out of the width calculation, so the open cafés fill the day.
  const setSkip = (on: boolean): void => {
    chart.options.skipNull = on; // a dataset option too; chart.js's types list it on the chart options
    chart.update();
    label.textContent = `skipNull: ${on}`;
  };
  setSkip(false);

  if (bar) toggle(bar, 'skipNull', false, setSkip);
  const stop = ctx.preview ? cycle([true, false], 2600, setSkip) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
