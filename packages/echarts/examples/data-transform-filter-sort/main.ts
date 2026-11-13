// A piped filter then sort transform on a dataset, with the series reading the result
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const source = [
  ['Product', 'Sales', 'Price', 'Year'],
  ['Cake', 123, 32, 2011], ['Latte', 231, 14, 2011], ['Tofu', 235, 5, 2011], ['Milk Tee', 341, 25, 2011], ['Porridge', 122, 29, 2011],
  ['Cake', 143, 30, 2012], ['Latte', 201, 19, 2012], ['Tofu', 255, 7, 2012], ['Milk Tee', 241, 27, 2012], ['Porridge', 102, 34, 2012],
  ['Cake', 153, 28, 2013], ['Latte', 181, 21, 2013], ['Tofu', 395, 4, 2013], ['Milk Tee', 281, 31, 2013], ['Porridge', 92, 39, 2013],
  ['Cake', 223, 29, 2014], ['Latte', 211, 17, 2014], ['Tofu', 345, 3, 2014], ['Milk Tee', 211, 35, 2014], ['Porridge', 72, 24, 2014],
];
const years = ['2011', '2012', '2013', '2014'];

interface Params { year: number; minPrice: number; order: 'asc' | 'desc' }

function build({ year, minPrice, order }: Params, preview: boolean): EChartsOption {
  return {
    dataset: [
      { source },
      {
        // Transforms in an array are piped: each one takes the previous output as input.
        transform: [
          // "filter": keep rows matching every operator in the config (logical and).
          { type: 'filter', config: { dimension: 'Year', '=': year } },
          { type: 'filter', config: { dimension: 'Price', '>=': minPrice } },
          // "sort": order the remaining rows by one dimension.
          { type: 'sort', config: { dimension: 'Sales', order } },
        ],
      },
    ],
    title: preview ? undefined : { text: `Year ${year}, Price >= ${minPrice}, Sales ${order}`, textStyle: { fontSize: 13 } },
    tooltip: {},
    grid: { top: preview ? 24 : 48, bottom: 24, left: 40, right: 16 },
    xAxis: { type: 'category' },
    yAxis: { name: 'Sales' },
    // The series reads dataset 1, the transform result, instead of the raw source.
    series: [{ type: 'bar', datasetIndex: 1, encode: { x: 'Product', y: 'Sales' }, label: { show: true, position: 'top' } }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const p: Params = { year: 2011, minPrice: 0, order: 'desc' };
  const show = (): void => {
    chart.setOption(build(p, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1800, () => {
      n += 1;
      p.year = 2011 + (n % 4);
      p.order = n % 2 ? 'asc' : 'desc';
      show();
    });
  } else {
    select(bar!, 'Year =', years, (v) => {
      p.year = Number(v);
      show();
    });
    slider(bar!, 'Price >=', [0, 35, 1], 0, (v) => {
      p.minPrice = v;
      show();
    });
    select(bar!, 'sort Sales', ['desc', 'asc'], (v) => {
      p.order = v as Params['order'];
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
