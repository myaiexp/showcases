// Field metadata: data.fields sorts a dimension, filters by domain and aliases the legend title
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const ROWS = [
  { date: '1-3', value: 22, type: 'Profit' },
  { date: '1-2', value: 20, type: 'Profit' },
  { date: '1-4', value: 30, type: 'Sales' },
  { date: '1-2', value: 220, type: 'Sales' },
  { date: '1-3', value: 230, type: 'Sales' },
  { date: '1-1', value: 90, type: 'Profit' },
  { date: '1-1', value: 160, type: 'Sales' },
  { date: '1-4', value: 12, type: 'Profit' },
];
const SORTS = ['unsorted', 'date ascending', 'date descending'] as const;
type Sort = (typeof SORTS)[number];

const specFor = (sort: Sort, max: number): ISpec =>
  ({
    type: 'bar',
    data: [
      {
        id: 'fieldsData',
        values: ROWS,
        fields: {
          date: { type: 'ordinal', ...(sort === 'unsorted' ? {} : { sortIndex: 1, sortReverse: sort === 'date descending' }) },
          value: { type: 'linear', domain: [0, max] },
          type: { alias: 'Kind' },
        },
      },
    ],
    xField: ['date', 'type'],
    yField: 'value',
    seriesField: 'type',
    legends: { visible: true, orient: 'top' },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let sort: Sort = 'date ascending';
  let max = 300;
  let chart = createChart(el, ctx, specFor(sort, max));
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, specFor(sort, max));
  };
  let stop = (): void => {};
  if (bar) {
    select(bar, 'sort', SORTS, (v) => { sort = v as Sort; rebuild(); }).value = sort;
    slider(bar, 'value domain max', [50, 300, 10], max, (v) => { max = v; rebuild(); });
  } else {
    let i = 0;
    stop = every(1800, () => {
      i++;
      sort = SORTS[i % SORTS.length] ?? 'unsorted';
      max = i % 2 === 0 ? 300 : 150;
      rebuild();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
