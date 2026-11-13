// Candlesticks with moving-average lines and markPoint / markLine / markArea summaries
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { makeStock, movingAverage } from '../../shared/stock-data.ts';

const stock = makeStock(100, 13);
const UP = '#26a69a';
const DOWN = '#ef5350';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let periods = [5, 20];
  let points = true;
  let average = true;
  let area = false;

  const show = (): void => {
    chart.setOption({
      legend: { show: !ctx.preview },
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 50, right: 24, top: 20, bottom: ctx.preview ? 24 : 64 },
      xAxis: { type: 'category', data: stock.dates },
      yAxis: { scale: true, splitArea: { show: false } },
      series: [
        {
          name: 'Price',
          type: 'candlestick',
          data: stock.oclh,
          itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN },
          // markPoint with type 'max' / 'min': valueDim picks the candle dimension to compare.
          markPoint: {
            show: points,
            symbolSize: 44,
            label: { fontSize: 10, formatter: (p: { value?: unknown }) => String(Math.round(Number(p.value))) },
            data: [
              { name: 'Highest', type: 'max', valueDim: 'highest' },
              { name: 'Lowest', type: 'min', valueDim: 'lowest' },
            ],
          } as object,
          // markLine with type 'average' on the close dimension.
          markLine: {
            show: average,
            symbol: 'none',
            label: { formatter: 'avg close {c}' },
            lineStyle: { type: 'dashed', color: '#aaa' },
            data: [{ name: 'Average close', type: 'average', valueDim: 'close' }],
          } as object,
          // markArea between two category values.
          markArea: {
            show: area,
            silent: true,
            itemStyle: { color: 'rgba(250,200,88,0.12)' },
            label: { show: true, position: 'insideTop', color: '#fac858' },
            data: [[{ name: 'Sample window', xAxis: stock.dates[40]! }, { xAxis: stock.dates[60]! }]],
          } as object,
        },
        // The moving averages are ordinary line series on the same axes.
        ...periods.map((n) => ({
          name: `MA${n}`,
          type: 'line' as const,
          data: movingAverage(stock.oclh, n),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1.5, opacity: 0.85 },
        })),
      ],
      dataZoom: [{ type: 'inside', start: 0, end: 100 }, { type: 'slider', show: !ctx.preview, bottom: 12 }],
    });
  };
  show();

  const stop = ctx.preview
    ? (() => {
        let n = 0;
        return every(1500, () => {
          n++;
          periods = [[5, 20], [10], [5, 10, 30], [20]][n % 4]!;
          points = n % 3 !== 2;
          area = n % 2 === 1;
          show();
        });
      })()
    : () => {};
  if (bar) {
    select(bar, 'moving averages', ['5 + 20', '10', '5 + 10 + 30', 'none'], (v) => {
      periods = v === 'none' ? [] : v.split(' + ').map(Number);
      show();
    });
    const p = button(bar, 'markPoint: on', () => {
      points = !points;
      p.textContent = `markPoint: ${points ? 'on' : 'off'}`;
      show();
    });
    const l = button(bar, 'markLine: on', () => {
      average = !average;
      l.textContent = `markLine: ${average ? 'on' : 'off'}`;
      show();
    });
    const a = button(bar, 'markArea: off', () => {
      area = !area;
      a.textContent = `markArea: ${area ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
