// Doughnut slices with rounded corners (borderRadius) and gaps between them (spacing)
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const LABELS = ['Done', 'In review', 'In progress', 'Blocked'];
const TASKS = [24, 9, 13, 4];
const COLORS = [C.green, C.blue, C.amber, C.red].map((c) => alpha(c, 0.9));

const STATES = [
  { borderRadius: 0, spacing: 0 },
  { borderRadius: 10, spacing: 0 },
  { borderRadius: 10, spacing: 6 },
  { borderRadius: 24, spacing: 10 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: LABELS,
      datasets: [
        {
          label: 'Tasks',
          data: TASKS,
          backgroundColor: COLORS,
          borderWidth: 0,
          // borderRadius rounds every corner of an arc; spacing leaves a fixed gap.
          borderRadius: 0,
          spacing: 0,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const apply = (s: { borderRadius: number; spacing: number }): void => {
    const ds = chart.data.datasets[0]!;
    ds.borderRadius = s.borderRadius;
    ds.spacing = s.spacing;
    chart.update();
    label.textContent = `borderRadius ${s.borderRadius}, spacing ${s.spacing}`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now = { borderRadius: 12, spacing: 5 };
    slider(bar, 'borderRadius', [0, 40, 1], now.borderRadius, (v) => {
      now.borderRadius = v;
      apply(now);
    });
    slider(bar, 'spacing', [0, 30, 1], now.spacing, (v) => {
      now.spacing = v;
      apply(now);
    });
    apply(now);
  }
  const stop = ctx.preview ? cycle(STATES, 1800, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
