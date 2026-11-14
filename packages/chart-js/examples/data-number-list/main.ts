// A week of sleep as a plain list of numbers plus a list of labels
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const NIGHTS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = [7.5, 6, 8, 5.5, 9];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let axis: 'x' | 'y' = 'x';
  let labelled = true;
  let chart: Chart | null = null;

  // Indexes pair the two lists: HOURS[2] is the value for NIGHTS[2] (data-structures.md).
  const build = (): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: 'bar',
      data: {
        labels: labelled ? NIGHTS : undefined,
        datasets: [{ label: 'Hours slept', data: HOURS, backgroundColor: alpha(C.purple, 0.6), borderColor: C.purple, borderWidth: 1 }],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: axis,
        plugins: { legend: { display: false } },
      },
    });
    label.textContent = ctx.preview
      ? `labels + data, indexAxis: '${axis}'`
      : `labels: ${JSON.stringify(labelled ? NIGHTS : [])}   data: ${JSON.stringify(HOURS)}`;
  };
  build();

  if (bar) {
    select(bar, 'indexAxis', ['x', 'y'] as const, axis, (v) => {
      axis = v;
      build();
    });
    toggle(bar, 'labels given', labelled, (v) => {
      labelled = v;
      build();
    });
  }
  const stop = ctx.preview
    ? cycle(['y', 'x'] as const, 2200, (v) => {
        axis = v;
        build();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
