// Candlestick series on generated OHLC data, with slider and inside dataZoom
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

let seed = 11;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Each item is [open, close, lowest, highest], the order candlestick expects by default.
const days: string[] = [];
const ohlc: number[][] = [];
let price = 100;
for (let i = 0; i < 120; i++) {
  const open = price;
  const close = Math.max(10, open + (rnd() - 0.48) * 8);
  const low = Math.min(open, close) - rnd() * 3;
  const high = Math.max(open, close) + rnd() * 3;
  ohlc.push([+open.toFixed(2), +close.toFixed(2), +low.toFixed(2), +high.toFixed(2)]);
  days.push(new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10));
  price = close;
}

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 50, right: 20, top: 16, bottom: ctx.preview ? 24 : 80 },
    xAxis: { type: 'category', data: days, boundaryGap: true },
    yAxis: { scale: true, splitArea: { show: false } }, // scale: don't force the axis to include zero
    // Two zoom components share one x axis: a slider for dragging and an inside one for wheel/touch.
    dataZoom: [
      { type: 'inside', start: 60, end: 100 },
      { type: 'slider', show: !ctx.preview, start: 60, end: 100, bottom: 16 },
    ],
    series: [
      {
        type: 'candlestick',
        data: ohlc,
        itemStyle: {
          color: '#26a69a', // rising body
          color0: '#ef5350', // falling body
          borderColor: '#26a69a',
          borderColor0: '#ef5350',
        },
      },
    ],
  });

  // Preview: slide the zoom window across the data.
  let start = 0;
  let dir = 1;
  const stop = ctx.preview
    ? every(1000, () => {
        // One step a second, so each update animation settles before the next.
        start += dir * 8;
        if (start > 70 || start < 0) dir = -dir;
        chart.dispatchAction({ type: 'dataZoom', start, end: start + 30 });
      })
    : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
