// A household budget as a pie: slice angles show each share of the whole
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { BUDGET, BUDGET_LABELS, SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const MONTHS = Object.keys(BUDGET);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // type 'pie' is a doughnut with cutout 0; data is plain numbers and Chart.js works
  // out each share from their total (doughnut.md § Data Structure).
  const chart = new Chart(stage.canvas, {
    type: 'pie',
    data: {
      labels: BUDGET_LABELS,
      datasets: [
        {
          label: '% of pay',
          data: BUDGET.January!,
          backgroundColor: sliceColors(BUDGET_LABELS.length),
          borderColor: SLICE_BORDER,
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  // Replace the numbers and call update(): the slices slide to their new angles.
  const show = (month: string): void => {
    chart.data.datasets[0]!.data = BUDGET[month]!;
    chart.update();
    label.textContent = `${month}: ${BUDGET[month]!.join(' / ')}`;
  };
  show('January');

  if (bar) select(bar, 'Month', MONTHS, 'January', show);
  const stop = ctx.preview ? cycle(MONTHS, 2200, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
