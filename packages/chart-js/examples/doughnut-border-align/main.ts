// Slice borders drawn over the edge (center) or kept inside each slice (inner)
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const LABELS = ['Mobile', 'Desktop', 'Tablet', 'Other'];
const VISITS = [52, 31, 11, 6];
const ALIGNS = ['center', 'inner'] as const;
type Align = (typeof ALIGNS)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);
  let width = 12;

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: LABELS,
      datasets: [
        {
          label: 'Visits (%)',
          data: VISITS,
          backgroundColor: [C.blue, C.amber, C.green, C.purple].map((c) => alpha(c, 0.8)),
          // A see-through white border makes the overlap of 'center' borders visible.
          borderColor: 'rgba(255, 255, 255, 0.55)',
          borderWidth: width,
          borderAlign: 'center',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: '35%',
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const apply = (align: Align): void => {
    const ds = chart.data.datasets[0]!;
    ds.borderAlign = align;
    ds.borderWidth = width;
    chart.update();
    label.textContent = `borderAlign: '${align}', borderWidth: ${width}`;
  };
  apply('center');

  let current: Align = 'center';
  if (bar) {
    select(bar, 'borderAlign', ALIGNS, current, (v) => apply((current = v)));
    slider(bar, 'borderWidth', [0, 30, 1], width, (v) => {
      width = v;
      apply(current);
    });
  }
  const stop = ctx.preview ? cycle(ALIGNS, 2000, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
