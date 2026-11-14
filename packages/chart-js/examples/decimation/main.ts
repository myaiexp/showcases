// 4,000 sensor readings thinned by the decimation plugin: lttb or min-max
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { sensorSignal } from '../../shared/general-data.ts';

const MODES = ['off', 'lttb', 'min-max'] as const;
type Mode = (typeof MODES)[number];
const TOTAL = 4000;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let mode: Mode = 'off';
  let samples = 60;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Temperature (°C)',
          // decimation.md requirements: a line dataset, x axis linear, parsing: false,
          // and a mutable array (the plugin keeps the original as dataset._data).
          data: [...sensorSignal(TOTAL)],
          borderColor: C.amber,
          borderWidth: 1.5,
          pointRadius: 2,
          pointBackgroundColor: C.amber,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      // The plugin only checks the chart-level option: parsing: false on the dataset
      // alone leaves decimation silently off.
      parsing: false,
      scales: { x: { type: 'linear', min: 0, max: TOTAL }, y: { min: 15, max: 35 } },
      plugins: {
        legend: { display: false },
        decimation: { enabled: false },
      },
    },
  });

  const apply = (): void => {
    // Re-read chart.options after every update: update() rebuilds the resolved options.
    const d = chart.options.plugins!.decimation!;
    d.enabled = mode !== 'off';
    if (mode !== 'off') {
      // threshold: decimate once more than this many points are in view
      Object.assign(d, { algorithm: mode, samples, threshold: 400 });
    }
    chart.update();
    const drawn = chart.getDatasetMeta(0).data.length;
    label.textContent = `${mode === 'off' ? 'decimation off' : `algorithm: '${mode}'`} · ${drawn} of ${TOTAL} points`;
  };
  apply();

  if (bar) {
    select(bar, 'algorithm', MODES, mode, (v) => ((mode = v), apply()));
    slider(bar, 'samples (lttb)', [10, 300, 5], samples, (v) => ((samples = v), apply()));
  }
  const stop = ctx.preview
    ? cycle(
        [
          ['lttb', 40],
          ['min-max', 40],
          ['lttb', 150],
          ['off', 40],
        ] as const,
        2200,
        ([m, n]) => {
          mode = m;
          samples = n;
          apply();
        },
      )
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
