// Two datasets on one doughnut draw as two rings: this year outside, last year inside
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const LABELS = ['Housing', 'Food', 'Travel', 'Health', 'Leisure'];
const LAST_YEAR = [9200, 4800, 2100, 1500, 1900];
const THIS_YEAR: number[][] = [
  [9600, 5100, 3900, 1600, 2300],
  [9600, 5200, 1200, 2900, 1700],
  [9800, 4700, 2600, 1500, 4200],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  caption(el, 'outer: this year, inner: last');

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: LABELS,
      datasets: [
        // The first dataset is the outer ring, the next one sits inside it.
        {
          label: 'This year (€)',
          data: THIS_YEAR[0]!,
          backgroundColor: sliceColors(LABELS.length, 0.9),
          borderColor: SLICE_BORDER,
          weight: 1,
        },
        {
          label: 'Last year (€)',
          data: LAST_YEAR,
          backgroundColor: sliceColors(LABELS.length, 0.45),
          borderColor: SLICE_BORDER,
          weight: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: '30%',
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  if (bar) {
    toggle(bar, 'Show last year', true, (on) => {
      chart.setDatasetVisibility(1, on);
      chart.update();
    });
    // weight: how thick a ring is compared with the other rings.
    slider(bar, 'Outer ring weight', [1, 4, 0.5], 1, (v) => {
      chart.data.datasets[0]!.weight = v;
      chart.update();
    });
  }
  const stop = ctx.preview
    ? cycle(THIS_YEAR, 2200, (d) => {
        chart.data.datasets[0]!.data = d;
        chart.update();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
