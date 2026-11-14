// Replay a doughnut's entrance: animateRotate, animateScale, or both
import type { Chart as ChartType } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, slider, toggle } from '../../shared/controls.ts';
import { BUDGET, BUDGET_LABELS, SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const MODES = [
  { animateRotate: true, animateScale: false },
  { animateRotate: false, animateScale: true },
  { animateRotate: true, animateScale: true },
  { animateRotate: false, animateScale: false },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);
  let chart: ChartType | null = null;
  const now = { ...MODES[0]!, duration: 1500 };

  // The entrance only plays when a chart is first drawn, so replaying means building it again.
  const build = (): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: 'doughnut',
      data: {
        labels: BUDGET_LABELS,
        datasets: [
          {
            label: '% of pay',
            data: BUDGET.January!,
            backgroundColor: sliceColors(BUDGET_LABELS.length),
            borderColor: SLICE_BORDER,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        animation: {
          animateRotate: now.animateRotate,
          animateScale: now.animateScale,
          duration: now.duration,
        },
        plugins: { legend: { display: !ctx.preview, position: 'right' } },
      },
    });
    label.textContent = `animateRotate: ${now.animateRotate}, animateScale: ${now.animateScale}`;
  };
  build();

  if (bar) {
    toggle(bar, 'animateRotate', now.animateRotate, (v) => {
      now.animateRotate = v;
      build();
    });
    toggle(bar, 'animateScale', now.animateScale, (v) => {
      now.animateScale = v;
      build();
    });
    slider(bar, 'duration (ms)', [300, 4000, 100], now.duration, (v) => {
      now.duration = v;
    });
    button(bar, 'Replay', build);
  }
  const stop = ctx.preview
    ? cycle(MODES, 2600, (m) => {
        Object.assign(now, m);
        build();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
