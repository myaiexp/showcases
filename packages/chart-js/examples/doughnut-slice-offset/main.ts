// Pull one slice out of a doughnut with offset, and push hovered slices with hoverOffset
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const LABELS = ['Phones', 'Laptops', 'Tablets', 'Watches', 'Audio'];
const SALES = [46, 28, 12, 8, 6];

/** An offset array with `px` at `index` and 0 everywhere else (-1 pulls nothing). */
const pull = (index: number, px: number): number[] => LABELS.map((_, i) => (i === index ? px : 0));

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
          label: 'Share of sales (%)',
          data: SALES,
          backgroundColor: sliceColors(LABELS.length),
          borderColor: SLICE_BORDER,
          // offset is indexable: the array is read by slice, so only one slice moves.
          offset: pull(0, 22),
          hoverOffset: 10,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: 24 },
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const show = (index: number, px: number): void => {
    chart.data.datasets[0]!.offset = pull(index, px);
    chart.update();
    label.textContent = `offset: [${pull(index, px).join(', ')}]`;
  };
  show(0, 22);

  if (bar) {
    let index = 0;
    let px = 22;
    select(bar, 'Pulled slice', ['none', ...LABELS], LABELS[0]!, (v) => {
      index = LABELS.indexOf(v);
      show(index, px);
    });
    slider(bar, 'offset (px)', [0, 50, 1], px, (v) => {
      px = v;
      show(index, px);
    });
    slider(bar, 'hoverOffset (px)', [0, 40, 1], 10, (v) => {
      chart.data.datasets[0]!.hoverOffset = v;
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(LABELS, 1500, (_, i) => show(i, 22)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
