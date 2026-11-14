// Grouped bars with a custom series that reads api.barLayout to draw a trend arrow across each pair
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const sample = (): number[][] => quarters.map(() => [Math.round(30 + Math.random() * 60), Math.round(30 + Math.random() * 60)]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let values = sample();
  let barWidth = 22;
  let barGap = '30%';
  const categoryGap = '40%';

  /**
   * api.barLayout returns, per bar of a group, its width and its offset from the category
   * centre (offsetCenter), computed the way the bar series do. The arrow joins the two tops.
   */
  const renderItem: CustomSeriesRenderItem = (_params, api) => {
    const cat = api.value(0) as number;
    const a = api.value(1) as number;
    const b = api.value(2) as number;
    const layout = api.barLayout!({ count: 2, barWidth, barGap, barCategoryGap: categoryGap });
    const [cx, ya] = api.coord([cat, a]) as [number, number];
    const [, yb] = api.coord([cat, b]) as [number, number];
    const x1 = cx + layout![0]!.offsetCenter;
    const x2 = cx + layout![1]!.offsetCenter;
    const lift = 10;
    const up = b >= a;
    const color = up ? '#5ad8a6' : '#e86452';
    const change = Math.round(((b - a) / a) * 100);
    return {
      type: 'group',
      children: [
        { type: 'line', shape: { x1, y1: ya - lift, x2: x2 - 5, y2: yb - lift }, style: { stroke: color, lineWidth: 2 } },
        { type: 'polygon', shape: { points: [[x2, yb - lift], [x2 - 8, yb - lift - 4], [x2 - 8, yb - lift + 4]] }, style: { fill: color } },
        {
          type: 'text',
          style: { text: `${change > 0 ? '+' : ''}${change}%`, x: (x1 + x2) / 2, y: Math.min(ya, yb) - lift - 14, fill: color, align: 'center', font: api.font({ fontSize: 12 }) },
        },
      ],
    };
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      legend: { show: !ctx.preview },
      grid: { top: 36, left: 36, right: 16, bottom: ctx.preview ? 24 : 60 },
      xAxis: { type: 'category', data: quarters },
      yAxis: { type: 'value', max: 120 },
      series: [
        { name: 'Last year', type: 'bar', barWidth, barGap, barCategoryGap: categoryGap, data: values.map((v) => v[0]) },
        { name: 'This year', type: 'bar', barWidth, barGap, barCategoryGap: categoryGap, data: values.map((v) => v[1]) },
        {
          name: 'Trend',
          type: 'custom',
          renderItem,
          // The trend sits on the category axis; the two values only feed renderItem.
          encode: { x: 0, y: [1, 2], tooltip: [1, 2] },
          data: values.map((v, i) => [i, v[0], v[1]]),
          z: 10,
          silent: true,
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      values = sample();
      show();
    });
  } else {
    slider(bar!, 'barWidth', [10, 40, 2], barWidth, (v) => {
      barWidth = v;
      show();
    });
    select(bar!, 'barGap', ['30%', '0%', '100%', '-50%'], (v) => {
      barGap = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
