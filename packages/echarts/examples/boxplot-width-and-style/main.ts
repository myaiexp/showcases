// Boxplot boxWidth [min, max], series itemStyle, a per-item override and the emphasis style
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const groups = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const rows = [
  [20, 34, 41, 52, 70],
  [26, 38, 44, 49, 61],
  [15, 30, 46, 58, 66],
  [32, 40, 45, 51, 58],
  [10, 28, 38, 55, 75],
  [24, 35, 43, 50, 63],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let minW: string | number = 8;
  let maxW: string | number = 60;
  let borderWidth = 2;
  let highlight = 2;
  let fill = 'transparent';

  const parse = (v: string): string | number => (v.endsWith('%') ? v : Number(v));

  const show = (): void => {
    chart.setOption({
      tooltip: {},
      grid: { left: 44, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: groups },
      yAxis: { type: 'value', scale: true },
      series: [
        {
          type: 'boxplot',
          // boxWidth: [min, max]. The width follows the band and is clamped between the two;
          // numbers are pixels, percentages are shares of the maximum possible width.
          boxWidth: [minW, maxW],
          itemStyle: { color: fill, borderColor: '#5470c6', borderWidth },
          // emphasis.itemStyle styles the box under the pointer.
          emphasis: { itemStyle: { borderColor: '#fac858', borderWidth: borderWidth + 2, shadowBlur: 8, shadowColor: 'rgba(250,200,88,0.5)' } },
          // A data item can be an object with its own itemStyle, overriding the series one.
          data: rows.map((value, i) => (i === highlight ? { value, itemStyle: { color: 'rgba(238,102,102,0.35)', borderColor: '#ee6666', borderWidth: borderWidth + 1 } } : value)),
        },
      ],
    });
  };
  show();

  // Preview: sweep the box width and move the highlighted box.
  let n = 0;
  const stop = ctx.preview
    ? every(1400, () => {
        n++;
        minW = [8, 20, '40%', 8][n % 4]!;
        maxW = [60, 30, '90%', 14][n % 4]!;
        highlight = n % rows.length;
        fill = n % 2 ? 'rgba(84,112,198,0.25)' : 'transparent';
        show();
      })
    : () => {};
  if (bar) {
    select(bar, 'boxWidth min', ['8', '20', '40%'], (v) => {
      minW = parse(v);
      show();
    });
    select(bar, 'boxWidth max', ['60', '30', '14', '90%'], (v) => {
      maxW = parse(v);
      show();
    });
    slider(bar, 'itemStyle.borderWidth', [1, 6, 1], borderWidth, (v) => {
      borderWidth = v;
      show();
    });
    select(bar, 'itemStyle.color', ['transparent', 'rgba(84,112,198,0.25)'], (v) => {
      fill = v;
      show();
    });
    select(bar, 'overridden item', groups, (v) => {
      highlight = groups.indexOf(v);
      show();
    }).value = 'Q3';
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
