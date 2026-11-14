// One list of paintings split into three datasets
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { paintingSizes, bubble } from '../../shared/dev-data.ts';
import { C, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'click a legend label to hide a dataset');
  stage.box.style.display = 'flex';
  stage.box.style.justifyContent = 'center';
  const rows = paintingSizes();

  // usage.md § Multiple datasets: one filter() per dataset.
  const slice = (label: string, keep: (w: number, h: number) => boolean, color: string) => ({
    label,
    data: rows.filter((r) => keep(r.width, r.height)).map(bubble),
    backgroundColor: alpha(color, 0.5),
    borderColor: color,
  });

  const chart = new Chart(stage.canvas, {
    type: 'bubble',
    data: {
      datasets: [
        slice('width = height', (w, h) => w === h, C.amber),
        slice('width > height', (w, h) => w > h, C.blue),
        slice('width < height', (w, h) => w < h, C.green),
      ],
    },
    options: {
      aspectRatio: 1,
      scales: { x: { max: 500 }, y: { max: 500 } },
      plugins: { legend: { labels: { boxWidth: 12, font: { size: ctx.preview ? 10 : 12 } } } },
    },
  });

  // Cards have no pointer: hide and show datasets the way a legend click would.
  const hidden = [-1, 0, 1, 2, -1];
  const stop = ctx.preview
    ? cycle(hidden, 1800, (i) => {
        chart.data.datasets.forEach((_, d) => chart.setDatasetVisibility(d, d !== i));
        chart.update();
        const name = chart.data.datasets[i]?.label;
        note.textContent = name ? `hidden: ${name}` : 'all three datasets visible';
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
