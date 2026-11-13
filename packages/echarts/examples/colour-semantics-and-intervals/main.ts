// Semantic colours, conventional red/blue and interval colours on a line, each against a plain scheme
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

type View = 'semantic: fruit' | 'convention: temperature' | 'intervals: planned sales';
type Scheme = 'meaningful' | 'default palette';

const fruit: [string, number, string][] = [
  ['Kiwi', 54, '#8db600'], ['Banana', 78, '#ffe135'], ['Orange', 66, '#ff9f1c'], ['Strawberry', 91, '#e63946'],
];
const temps = [-4, -2, 3, 9, 14, 19, 22, 21, 15, 9, 2, -3];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const sales = [18, 34, 52, 70, 86, 74, 58, 40, 22, 38, 66, 92];

function build(view: View, scheme: Scheme): EChartsOption {
  const meaningful = scheme === 'meaningful';
  const base: EChartsOption = { tooltip: { trigger: 'axis' }, grid: { top: 48, left: 44, right: 16, bottom: 36 } };
  if (view === 'semantic: fruit') {
    return {
      ...base,
      xAxis: { type: 'category', data: fruit.map((f) => f[0]) },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        // Each bar takes the colour of the fruit it stands for, so it is recognised without a legend.
        data: fruit.map(([, v, c]) => (meaningful ? { value: v, itemStyle: { color: c } } : v)),
        colorBy: 'data',
        barCategoryGap: '40%',
      }],
    };
  }
  if (view === 'convention: temperature') {
    return {
      ...base,
      xAxis: { type: 'category', data: months, axisLabel: { interval: 1 } },
      yAxis: { type: 'value', name: '°C' },
      series: [{
        type: 'bar',
        // Warm is red, cold is blue; the other scheme uses one neutral colour for both.
        data: temps.map((t) => ({ value: t, itemStyle: { color: meaningful ? (t >= 0 ? '#ee6666' : '#5470c6') : '#9a9a9a' } })),
      }],
    };
  }
  return {
    ...base,
    xAxis: { type: 'category', data: months, boundaryGap: false },
    yAxis: { type: 'value', min: 0, max: 100 },
    // Divide the data by colour: the planned range is 25 to 75.
    visualMap: meaningful
      ? {
          type: 'piecewise',
          orient: 'horizontal',
          top: 0,
          left: 'center',
          textStyle: { color: '#ccc' },
          pieces: [
            { lt: 25, label: 'below goal', color: '#ee6666' },
            { gte: 25, lt: 75, label: 'on plan', color: '#fac858' },
            { gte: 75, label: 'above goal', color: '#3ba272' },
          ],
        }
      : undefined,
    series: [{ type: 'line', data: sales, symbolSize: 8, lineStyle: { width: 3 }, markLine: { silent: true, symbol: 'none', label: { formatter: '{c}' }, data: [{ yAxis: 25 }, { yAxis: 75 }] } }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const views: View[] = ['semantic: fruit', 'convention: temperature', 'intervals: planned sales'];
  let view: View = views[0]!;
  let scheme: Scheme = 'meaningful';
  const show = (): void => {
    chart.setOption(build(view, scheme), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2200, () => {
      i += 1;
      view = views[i % 3]!;
      scheme = i % 7 === 6 ? 'default palette' : 'meaningful';
      show();
    });
  } else {
    select(bar!, 'chart', views, (v) => { view = v as View; show(); });
    select(bar!, 'colours', ['meaningful', 'default palette'], (v) => { scheme = v as Scheme; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
