// A derived data entry: fromDataId reads another entry, a filter transform drops empty rows
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';

const SOURCES = ['dataSource', 'dataNoEmpty'] as const;

const specFor = (dataId: (typeof SOURCES)[number]): ISpec =>
  ({
    type: 'bar',
    data: [
      {
        id: 'dataSource',
        values: [
          { date: 'Monday', 'Class 1': 20, 'Class 2': 30 },
          { date: 'Tuesday', 'Class 1': 25, 'Class 2': 28 },
          { date: 'Wednesday', 'Class 1': null, 'Class 2': undefined },
          { date: 'Thursday', 'Class 1': 31, 'Class 2': 22 },
        ],
        transforms: [{ type: 'fold', options: { key: 'class', value: 'score', fields: ['Class 1', 'Class 2'] } }],
      },
      {
        id: 'dataNoEmpty',
        fromDataId: 'dataSource',
        transforms: [
          { type: 'filter', options: { callback: (datum: { score?: number | null }) => datum.score !== null && datum.score !== undefined } },
        ],
      },
    ],
    dataId,
    seriesField: 'class',
    xField: ['date', 'class'],
    yField: 'score',
    legends: { visible: true, orient: 'top' },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let current: (typeof SOURCES)[number] = 'dataSource';
  let chart = createChart(el, ctx, specFor(current));
  const out = bar ? readout(el) : null;
  const show = (id: (typeof SOURCES)[number]): void => {
    current = id;
    chart.release();
    chart = createChart(el, ctx, specFor(id));
    if (out) {
      const counts = SOURCES.map((s) => `${s}: ${chart.vchart.getDataSet().getDataView(s)?.latestData?.length} rows`);
      out.textContent = `${counts.join('   ')}   (the series reads ${id})`;
    }
  };
  show(current);
  let stop = (): void => {};
  if (bar) select(bar, 'series dataId', SOURCES, (v) => show(v as (typeof SOURCES)[number]));
  else stop = every(2000, () => show(current === 'dataSource' ? 'dataNoEmpty' : 'dataSource'));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
