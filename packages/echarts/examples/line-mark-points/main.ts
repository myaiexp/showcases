// markPoint on a line: min / max / average types, a data coord and a fixed screen position
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';
import { MONTHS, walk } from '../../shared/line-data.ts';

interface Look { symbol: string; size: number; showValue: boolean; types: boolean; coord: boolean; fixed: boolean }

function build(values: number[], look: Look): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 56, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: MONTHS },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'line',
        data: values,
        markPoint: {
          // symbol / symbolSize apply to every point; a data item can override them.
          symbol: look.symbol,
          symbolSize: look.size,
          label: {
            // The label is shown inside the symbol by default; {b} is the point's name, {c} its value.
            formatter: look.showValue ? '{c}' : '{b}',
            fontSize: Math.max(8, look.size / 4),
          },
          data: [
            // type: the maximum, minimum or average of the series values.
            ...(look.types
              ? [
                  { type: 'max' as const, name: 'max' },
                  { type: 'min' as const, name: 'min' },
                  // The average has no data point to sit on, so it is placed on the axis value.
                  { type: 'average' as const, name: 'avg', itemStyle: { color: '#91cc75' } },
                ]
              : []),
            // coord: [category index or name, value] in data coordinates.
            ...(look.coord ? [{ coord: ['Jun', values[5]!], name: 'Jun', itemStyle: { color: '#fac858' } }] : []),
            // x / y: pixel or percent positions; relativeTo 'coordinate' measures them from the grid
            // instead of the whole chart container (6.0.0).
            ...(look.fixed
              ? [{ x: '92%', y: '8%', relativeTo: 'coordinate' as const, name: 'fixed', value: 'top right', symbol: 'rect', symbolSize: [60, 28], itemStyle: { color: '#ee6666' } }]
              : []),
          ],
        },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let values = walk(12, 8, 20, 6).map((v) => Math.round(v));
  const look: Look = { symbol: 'pin', size: 50, showValue: true, types: true, coord: true, fixed: true };
  const show = (): void => {
    chart.setOption(build(values, look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const symbols = ['pin', 'circle', 'arrow', 'diamond'];
    let n = 0;
    stop = every(1600, () => {
      n += 1;
      look.symbol = symbols[n % symbols.length]!;
      if (n % 4 === 0) values = walk(12, 100 + n, 20, 6).map((v) => Math.round(v));
      show();
    });
  } else {
    select(bar!, 'symbol', ['pin', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'arrow'], (v) => {
      look.symbol = v;
      show();
    });
    slider(bar!, 'symbolSize', [20, 80, 2], 50, (v) => {
      look.size = v;
      show();
    });
    select(bar!, 'label', ['value {c}', 'name {b}'], (v) => {
      look.showValue = v.startsWith('value');
      show();
    });
    const toggle = (key: 'types' | 'coord' | 'fixed', text: string): void => {
      const b = button(bar!, `${text}: on`, () => {
        look[key] = !look[key];
        b.textContent = `${text}: ${look[key] ? 'on' : 'off'}`;
        show();
      });
    };
    toggle('types', 'min / max / average');
    toggle('coord', 'coord');
    toggle('fixed', 'x / y');
    button(bar!, 'new data', () => {
      values = walk(12, Math.floor(Math.random() * 1000), 20, 6).map((v) => Math.round(v));
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
