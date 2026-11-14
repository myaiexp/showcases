// Choose where a doughnut starts (rotation) and how much of the circle it covers (circumference)
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const LABELS = ['Electricity', 'Heating', 'Water', 'Internet'];
const COSTS = [62, 95, 28, 35];
const STATES = [
  { rotation: 0, circumference: 360 },
  { rotation: -90, circumference: 180 },
  { rotation: -135, circumference: 270 },
  { rotation: 45, circumference: 90 },
  { rotation: 180, circumference: 200 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: LABELS,
      datasets: [
        {
          label: 'Monthly cost (€)',
          data: COSTS,
          backgroundColor: sliceColors(LABELS.length),
          borderColor: SLICE_BORDER,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // Degrees. rotation 0 starts at 12 o'clock; circumference is the sweep the slices share.
      rotation: 0,
      circumference: 360,
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const apply = (s: { rotation: number; circumference: number }): void => {
    chart.options.rotation = s.rotation;
    chart.options.circumference = s.circumference;
    chart.update();
    label.textContent = `rotation: ${s.rotation}, circumference: ${s.circumference}`;
  };

  if (bar) {
    const now = { rotation: 0, circumference: 360 };
    slider(bar, 'rotation (°)', [-180, 180, 5], now.rotation, (v) => {
      now.rotation = v;
      apply(now);
    });
    slider(bar, 'circumference (°)', [30, 360, 5], now.circumference, (v) => {
      now.circumference = v;
      apply(now);
    });
  }
  const stop = ctx.preview ? cycle(STATES, 2000, apply) : () => {};
  if (ctx.preview) apply(STATES[0]!);

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
