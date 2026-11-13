// Candlestick fed with [date, open, high, low, close] rows through encode, plus barWidth limits
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { makeStock } from '../../shared/stock-data.ts';

const stock = makeStock(30, 33);
// Source rows in the order many feeds use: [date, open, high, low, close].
const rows = stock.oclh.map(([o, c, l, h], i) => [stock.dates[i]!, o!, h!, l!, c!]);

type Width = string | number | undefined;
const parse = (v: string): Width => (v === 'auto' ? undefined : v.endsWith('%') ? v : Number(v));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let remap = true;
  let barWidth: Width;
  let barMinWidth: Width;
  let barMaxWidth: Width = 14;
  let count = 30;

  const show = (): void => {
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 50, right: 16, top: 16, bottom: 28 },
      xAxis: { type: 'category' },
      yAxis: { scale: true, splitArea: { show: false } },
      dataset: { source: rows.slice(0, count) },
      series: [
        {
          type: 'candlestick',
          // The default dimension order is [open, close, lowest, highest]. With rows in
          // [date, open, high, low, close] order, encode.y remaps the four dimensions
          // (columns 1, 4, 3, 2) without reordering the data.
          // Left at the default, the columns are read in the wrong order: see what happens.
          encode: remap ? { x: 0, y: [1, 4, 3, 2] } : { x: 0, y: [1, 2, 3, 4] },
          // barWidth fixes the width; barMinWidth / barMaxWidth only clamp the automatic one.
          barWidth,
          barMinWidth,
          barMaxWidth,
          itemStyle: { color: '#26a69a', color0: '#ef5350', borderColor: '#26a69a', borderColor0: '#ef5350' },
        },
      ],
    });
  };
  show();

  // Preview: grow and shrink the number of candles, which changes the automatic width.
  let n = 0;
  const stop = ctx.preview
    ? every(1600, () => {
        n++;
        count = [30, 12, 20, 6][n % 4]!;
        barMaxWidth = n % 2 ? 30 : 10;
        show();
      })
    : () => {};
  if (bar) {
    select(bar, 'encode.y', ['[1, 4, 3, 2] (remapped)', '[1, 2, 3, 4] (unmapped)'], (v) => {
      remap = v.includes('remapped');
      show();
    });
    select(bar, 'barWidth', ['auto', '4', '10', '24', '60%'], (v) => {
      barWidth = parse(v);
      show();
    });
    select(bar, 'barMinWidth', ['auto', '8', '20'], (v) => {
      barMinWidth = parse(v);
      show();
    });
    select(bar, 'barMaxWidth', ['14', 'auto', '6', '30'], (v) => {
      barMaxWidth = parse(v);
      show();
    });
    select(bar, 'candles', ['30', '20', '12', '6'], (v) => {
      count = Number(v);
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
