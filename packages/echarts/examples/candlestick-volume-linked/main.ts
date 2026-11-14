// Candles above a volume bar panel: two grids, shared dataZoom and a linked axisPointer
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { makeStock } from '../../shared/stock-data.ts';

const stock = makeStock(90, 5);
const UP = '#26a69a';
const DOWN = '#ef5350';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let linked = true;
  let pointerType = 'cross';
  let volumeShare = 22; // percent of the chart height

  const show = (): void => {
    const topH = 100 - volumeShare - (ctx.preview ? 18 : 26);
    chart.setOption({
      // axisPointer.link ties the pointers of several axes together: hovering one panel
      // shows the guide line (and the tooltip) at the same date in the other.
      axisPointer: { link: linked ? [{ xAxisIndex: 'all' }] : [], label: { backgroundColor: '#555' } },
      tooltip: { trigger: 'axis', axisPointer: { type: pointerType as 'cross' } },
      // Two grids stacked: candles on top, volume underneath.
      grid: [
        { left: 52, right: 16, top: 12, height: `${topH}%` },
        { left: 52, right: 16, top: `${topH + 12}%`, height: `${volumeShare - 6}%` },
      ],
      xAxis: [
        { type: 'category', data: stock.dates, gridIndex: 0, axisLabel: { show: false }, axisTick: { show: false } },
        { type: 'category', data: stock.dates, gridIndex: 1, axisLabel: { show: !ctx.preview } },
      ],
      yAxis: [
        { gridIndex: 0, scale: true, splitArea: { show: false } },
        { gridIndex: 1, scale: true, splitNumber: 2, axisLabel: { show: !ctx.preview }, splitLine: { show: false } },
      ],
      // One dataZoom drives both x axes, so the panels always show the same dates.
      dataZoom: [
        { type: 'inside', xAxisIndex: [0, 1], start: 50, end: 100 },
        { type: 'slider', show: !ctx.preview, xAxisIndex: [0, 1], start: 50, end: 100, bottom: 8 },
      ],
      series: [
        {
          type: 'candlestick',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: stock.oclh,
          itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN },
        },
        {
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: stock.volume.map((v, i) => ({ value: v, itemStyle: { color: stock.oclh[i]![1]! >= stock.oclh[i]![0]! ? UP : DOWN } })),
        },
      ],
    });
  };
  show();

  let start = 0;
  let dir = 1;
  const stop = ctx.preview
    ? every(1000, () => {
        start += dir * 6;
        if (start > 60 || start < 0) dir = -dir;
        chart.dispatchAction({ type: 'dataZoom', start, end: start + 40 });
      })
    : () => {};
  if (bar) {
    select(bar, 'axisPointer.link', ['linked', 'unlinked'], (v) => {
      linked = v === 'linked';
      show();
    });
    select(bar, 'axisPointer.type', ['cross', 'line', 'shadow'], (v) => {
      pointerType = v;
      show();
    });
    slider(bar, 'volume panel %', [10, 40, 2], volumeShare, (v) => {
      volumeShare = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
