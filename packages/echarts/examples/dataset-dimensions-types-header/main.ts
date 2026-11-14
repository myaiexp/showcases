// The same table given to dataset as a 2D array, array of objects or column object, with and without dimension names and types
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

interface Variant { note: string; dataset: Record<string, unknown>; time?: boolean }

const names = ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'];
const y15 = [43.3, 83.1, 86.4, 72.4];
const y16 = [85.8, 73.4, 65.2, 53.9];
const rows = names.map((n, i) => [n, y15[i]!, y16[i]!]);

const variants: Record<string, Variant> = {
  'header row, auto': {
    note: 'First row holds the names; sourceHeader is left on auto, so ECharts detects it.',
    dataset: { source: [['product', '2015', '2016'], ...rows] },
  },
  'header row, sourceHeader: true': {
    note: 'sourceHeader: true states that the first row is the dimension names, with no guessing.',
    dataset: { sourceHeader: true, source: [['product', '2015', '2016'], ...rows] },
  },
  'no header, dimensions': {
    note: 'Pure data rows; dataset.dimensions supplies the names, and a type for the first one.',
    dataset: { sourceHeader: false, dimensions: [{ name: 'product', type: 'ordinal' }, '2015', '2016'], source: rows },
  },
  'array of objects': {
    note: 'Row based key-value format; dimensions lists which keys to use and in what order.',
    dataset: {
      dimensions: ['product', '2015', '2016'],
      source: names.map((n, i) => ({ product: n, '2015': y15[i], '2016': y16[i] })),
    },
  },
  'column-keyed object': {
    note: 'Column based key-value format: each value is one column of the table; dimensions says which columns to read, in order.',
    dataset: { dimensions: ['product', '2015', '2016'], source: { product: names, '2015': y15, '2016': y16 } },
  },
  'time dimension': {
    note: "A dimension of type 'time' makes ECharts parse the date strings as timestamps; the x axis is a time axis.",
    time: true,
    dataset: {
      dimensions: [{ name: 'day', type: 'time' }, 'visits'],
      source: [['2017-05-10', 120], ['2017-05-12', 200], ['2017-05-15', 150], ['2017-05-20', 280], ['2017-06-01', 240]],
    },
  },
};

function build(v: Variant, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    legend: preview || v.time ? { show: false } : {},
    grid: { top: 20, left: 40, right: 16, bottom: preview ? 24 : 60 },
    dataset: v.dataset as EChartsOption['dataset'],
    xAxis: v.time ? { type: 'time' } : { type: 'category' },
    yAxis: {},
    // No encode needed: for a category (or time) x axis the first dimension goes to x and
    // each following dimension becomes a series, so the bar count follows the dimensions.
    series: v.time ? [{ type: 'line', showSymbol: true }] : [{ type: 'bar' }, { type: 'bar' }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const keys = Object.keys(variants);
  let key = keys[0]!;
  const code = document.createElement('pre');
  code.style.cssText = 'font-size:12px;opacity:.85;white-space:pre-wrap;margin:8px 0 0';
  if (!ctx.preview) el.append(code);

  const show = (): void => {
    const v = variants[key]!;
    chart.setOption(build(v, ctx.preview), true);
    code.textContent = `${v.note}\n\ndataset: ${JSON.stringify(v.dataset)}`;
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      key = keys[++i % keys.length]!;
      show();
    });
  } else {
    select(bar!, 'source form', keys, (v) => {
      key = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
    code.remove();
  };
};

export default mount;
