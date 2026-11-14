// Tooltip lines sorted by value (itemSort) and thinned out (filter)
import type { TooltipItem } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';

type Item = TooltipItem<'bar'>;
type Sort = 'dataset order' | 'biggest first' | 'smallest first';
type Filter = 'show all' | 'only 350 or more' | 'leave out Filter';
const SORTS: readonly Sort[] = ['dataset order', 'biggest first', 'smallest first'];
const FILTERS: readonly Filter[] = ['show all', 'only 350 or more', 'leave out Filter'];

const CARD_STATES: readonly [Sort, Filter][] = [
  ['dataset order', 'show all'],
  ['biggest first', 'show all'],
  ['smallest first', 'show all'],
  ['biggest first', 'only 350 or more'],
  ['dataset order', 'leave out Filter'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const note = caption(el);
  note.style.whiteSpace = 'pre-line';

  let sort: Sort = 'dataset order';
  let filter: Filter = 'show all';

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(3) },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 700 } },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: !ctx.preview },
        tooltip: {
          // tooltip.md § Sort Callback and § Filter Callback: plain Array sort / filter functions.
          itemSort: (a: Item, b: Item) => {
            if (sort === 'biggest first') return (b.parsed.y ?? 0) - (a.parsed.y ?? 0);
            if (sort === 'smallest first') return (a.parsed.y ?? 0) - (b.parsed.y ?? 0);
            return a.datasetIndex - b.datasetIndex;
          },
          filter: (item: Item) => {
            if (filter === 'only 350 or more') return (item.parsed.y ?? 0) >= 350;
            if (filter === 'leave out Filter') return item.dataset.label !== 'Filter';
            return true;
          },
        },
      },
    },
  });

  // Both functions are read when the tooltip updates, so a change shows on the next hover.
  const apply = (s: Sort, f: Filter): void => {
    sort = s;
    filter = f;
    note.textContent = `itemSort: ${s}\nfilter: ${f}`;
    chart.update();
  };
  apply(sort, filter);

  if (bar) {
    select(bar, 'itemSort', SORTS, sort, (v) => apply(v, filter));
    select(bar, 'filter', FILTERS, filter, (v) => apply(sort, v));
  }
  const stopLook = ctx.preview ? cycle(CARD_STATES, 2600, (s) => apply(...s)) : () => {};
  const stopHover = ctx.preview
    ? autoHover(chart, 1300, (s) => [0, 1, 2].map((datasetIndex) => ({ datasetIndex, index: 3 + (s % 3) })))
    : () => {};

  return () => {
    stopLook();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
