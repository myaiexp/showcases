// Two y axes: with display 'auto' the right axis disappears when its dataset is hidden
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

type Mode = 'true' | 'false' | 'auto';
// [mode, is the rainfall dataset visible]
const STATES: [Mode, boolean][] = [
  ['auto', true],
  ['auto', false],
  ['true', false],
  ['false', true],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const w = CITY_WEATHER.Lisbon!;
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Temperature (°C)', data: w.temp, yAxisID: 'celsius', borderColor: C.orange, backgroundColor: C.orange, tension: 0.3 },
        { label: 'Rainfall (mm)', data: w.rain, yAxisID: 'mm', borderColor: C.blue, backgroundColor: alpha(C.blue, 0.5), tension: 0.3 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        celsius: { position: 'left', min: 0 },
        mm: { position: 'right', min: 0, display: 'auto', grid: { drawOnChartArea: false } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const mm = (): CartesianScaleOptions => chart.options.scales!.mm as CartesianScaleOptions;

  // _common.md: display 'auto' shows the axis only if a dataset using it is visible.
  const apply = ([mode, visible]: [Mode, boolean]): void => {
    mm().display = mode === 'auto' ? 'auto' : mode === 'true';
    chart.setDatasetVisibility(1, visible);
    chart.update();
    label.textContent = `display: ${mode === 'auto' ? "'auto'" : mode} · rain ${visible ? 'shown' : 'hidden'}`;
  };
  apply(STATES[0]!);

  if (bar) {
    // The legend toggles datasets too: click "Rainfall" to hide it.
    select(bar, 'Right axis display', ['auto', 'true', 'false'] as const, 'auto', (v) => {
      mm().display = v === 'auto' ? 'auto' : v === 'true';
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
