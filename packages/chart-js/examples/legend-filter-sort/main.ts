// The legend can drop entries (labels.filter) and reorder them (labels.sort)
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { DRINKS, SALES_MONTHS } from '../../shared/config-data.ts';

type Sort = 'dataset order' | 'A to Z' | 'biggest total first';
const SORTS: readonly Sort[] = ['dataset order', 'A to Z', 'biggest total first'];

const sum = (values: readonly unknown[]): number => values.reduce<number>((t, v) => t + Number(v), 0);

const CARD_STATES: readonly [Sort, boolean][] = [
  ['dataset order', false],
  ['A to Z', false],
  ['biggest total first', false],
  ['biggest total first', true],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const note = caption(el);
  note.style.whiteSpace = 'pre-line';

  let sort: Sort = 'dataset order';
  let hideGoal = false;

  const datasets = [
    ...DRINKS.map(([label, color, data]) => ({
      label,
      data: [...data],
      backgroundColor: alpha(color, 0.7),
      borderColor: color,
      borderWidth: 1,
    })),
    { label: 'Monthly goal', data: SALES_MONTHS.map(() => 450), backgroundColor: alpha(C.grey, 0.4), borderColor: C.grey, borderWidth: 1 },
  ];

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: ctx.preview ? 'top' : 'right',
          labels: {
            boxWidth: ctx.preview ? 12 : 40,
            font: { size: ctx.preview ? 10 : 12 },
            // Both callbacks are re-read on update(); they see the current choices.
            filter: (item) => !(hideGoal && item.text === 'Monthly goal'),
            sort: (a, b, data) => {
              const [x, y] = [a, b].map((i) => data.datasets[i.datasetIndex ?? 0]!);
              if (sort === 'A to Z') return a.text.localeCompare(b.text);
              if (sort === 'biggest total first') return sum(y!.data) - sum(x!.data);
              return (a.datasetIndex ?? 0) - (b.datasetIndex ?? 0);
            },
          },
        },
      },
    },
  });

  const apply = (s: Sort, hide: boolean): void => {
    sort = s;
    hideGoal = hide;
    note.textContent = `sort: ${s}\nfilter: ${hide ? 'hides Monthly goal' : 'none'}`;
    chart.update();
  };
  note.textContent = `sort: ${sort}\nfilter: none`;

  if (bar) {
    select(bar, 'labels.sort', SORTS, sort, (v) => apply(v, hideGoal));
    toggle(bar, "labels.filter: leave out 'Monthly goal'", false, (v) => apply(sort, v));
  }
  const stop = ctx.preview ? cycle(CARD_STATES, 2200, (s) => apply(...s)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
