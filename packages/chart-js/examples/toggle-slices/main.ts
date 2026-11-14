// Drop a category from a doughnut or bar with toggleDataVisibility
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const SPENDING = [
  ['Rent', 950, C.blue],
  ['Food', 420, C.green],
  ['Transport', 140, C.cyan],
  ['Fun', 230, C.purple],
  ['Savings', 300, C.amber],
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "this month's budget (€)");
  let kind: 'doughnut' | 'bar' = 'doughnut';
  let chart: Chart<'doughnut' | 'bar'>;

  const build = (): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: kind,
      data: {
        labels: SPENDING.map((s) => s[0]),
        datasets: [
          {
            label: 'Budget (€)',
            data: SPENDING.map((s) => s[1]),
            backgroundColor: SPENDING.map((s) => alpha(s[2], 0.75)),
            borderColor: SPENDING.map((s) => s[2]),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            // Legend labels toggle the same flag; the strikethrough comes from getDataVisibility.
            onClick: (_e, item) => flip(item.index ?? 0),
          },
        },
      },
    });
  };

  // api.md § toggleDataVisibility(index) and § getDataVisibility(index).
  const flip = (index: number): void => {
    chart.toggleDataVisibility(index);
    chart.update();
    const shown = SPENDING.filter((_, i) => chart.getDataVisibility(i)).reduce((sum, s) => sum + s[1], 0);
    note.textContent = ctx.preview ? `toggle(${index}) · € ${shown} shown` : `toggleDataVisibility(${index}) · € ${shown} shown`;
  };

  build();
  if (bar) {
    select(bar, 'Chart type', ['doughnut', 'bar'] as const, kind, (v) => {
      kind = v;
      build();
    });
  }
  const stop = ctx.preview ? cycle([1, 3, 1, 3, 0, 0], 1600, (i) => flip(i)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
