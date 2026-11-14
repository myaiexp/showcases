// DataView chains that update themselves: two CSV views, a merged view and an average view
import type { Mount } from '@/types.ts';
import { DataSet, DataView, type ISpec } from '@visactor/vchart';
import { THEME, VChart, button, controlBar, every, readout } from '../../shared/chart.ts';

const csv = (rows: string[]): string => `year,group,value\n${rows.join('\n')}`;
const LESS50 = (n: number): string => csv(['1990,18-34,16.9', '1990,35-49,12.2', '1991,18-34,17', '1991,35-49,17.8', '1993,18-34,26.5', '1993,35-49,23.8', '1995,18-34,28', '1995,35-49,25', '1997,18-34,33', '1997,35-49,30'].slice(0, n * 2));
const OVER50 = (n: number): string => csv(['1990,50-64,10.2', '1990,65+,5.2', '1991,50-64,10', '1991,65+,4.8', '1993,50-64,16.8', '1993,65+,6.6', '1995,50-64,19', '1995,65+,8', '1997,50-64,22', '1997,65+,11'].slice(0, n * 2));

type Row = { year: string; group: string; value: number };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const container = document.createElement('div');
  container.style.cssText = `width:100%;height:${ctx.preview ? 200 : 420}px`;
  el.append(container);

  // A VChart registers its parsers ('csv', 'dataview') on the DataSet it is given when it is constructed.
  // A throwaway instance makes them available before the views are built, then the real chart reuses the set.
  const dataSet = new DataSet();
  new VChart({ type: 'common' } as ISpec, { dataSet, dom: container }).release();

  const rowsOf = (input: Row[] | DataView[]): Row[] =>
    input.flatMap((item) => (item instanceof DataView ? (item.latestData as Row[]) : [item]));
  dataSet.registerTransform('mergeDataView', (views: DataView[]) => rowsOf(views));
  // A hand-written stand-in for the built-in statistics transform: the mean of value per year.
  dataSet.registerTransform('averageByYear', (input: Row[] | DataView[]) => {
    const sums = new Map<string, { sum: number; n: number }>();
    for (const r of rowsOf(input)) {
      const s = sums.get(r.year) ?? { sum: 0, n: 0 };
      sums.set(r.year, { sum: s.sum + Number(r.value), n: s.n + 1 });
    }
    return [...sums].map(([year, s]) => ({ year, avg: Math.round((s.sum / s.n) * 100) / 100 }));
  });

  const dataView1 = new DataView(dataSet, { name: 'dataView1' });
  dataView1.parse(LESS50(3), { type: 'csv' });
  const dataView2 = new DataView(dataSet, { name: 'dataView2' });
  dataView2.parse(OVER50(3), { type: 'csv' });
  const dataViewMerge = new DataView(dataSet, { name: 'dataViewMerge' });
  dataViewMerge.parse([dataView1, dataView2], { type: 'dataview' });
  dataViewMerge.transform({ type: 'mergeDataView' });
  const dataViewAvg = new DataView(dataSet, { name: 'dataViewAvg' });
  dataViewAvg.parse([dataViewMerge], { type: 'dataview' });
  dataViewAvg.transform({ type: 'averageByYear' });

  const vchart = new VChart(
    {
      type: 'common',
      data: [dataViewMerge, dataViewAvg],
      series: [
        { type: 'bar', dataId: 'dataViewMerge', xField: 'year', yField: 'value', seriesField: 'group' },
        { type: 'line', dataId: 'dataViewAvg', xField: 'year', yField: 'avg' },
      ],
      axes: [{ orient: 'left' }, { orient: 'bottom', type: 'band' }],
    } as unknown as ISpec,
    { theme: THEME, dataSet, dom: container },
  );
  vchart.renderSync();

  let years = 3;
  let alive = true;
  const grow = (n: number): void => {
    if (!alive) return;
    years = n;
    // Only the two source views are touched; the merged and average views are notified by the DataSet.
    dataView1.parseNewData(LESS50(n), { type: 'csv' });
    dataView2.parseNewData(OVER50(n), { type: 'csv' });
  };
  let stop = (): void => {};
  if (bar) {
    const out = readout(el);
    const show = (): void => {
      out.textContent = `source views: ${years} years each; merged rows: ${dataViewMerge.latestData.length}; average rows: ${dataViewAvg.latestData.length}`;
    };
    button(bar, 'Parse 3 years', () => { grow(3); show(); });
    button(bar, 'Parse 4 years', () => { grow(4); show(); });
    button(bar, 'Parse 5 years', () => { grow(5); show(); });
    show();
  } else {
    stop = every(1800, () => grow(years >= 5 ? 3 : years + 1));
  }
  return () => {
    alive = false;
    stop();
    vchart.release();
    container.remove();
  };
};

export default mount;
