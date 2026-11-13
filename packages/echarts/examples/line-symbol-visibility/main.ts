// showSymbol, showAllSymbol and symbol callbacks on a dense category axis
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const cats = Array.from({ length: 60 }, (_, i) => `d${i + 1}`);
const values = walk(60, 11, 50, 8);

interface Look { showSymbol: boolean; showAll: boolean | 'auto'; symbol: string; callbacks: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: cats },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'line',
        data: values,
        // showSymbol: false hides the markers; they still appear while the tooltip hovers a point.
        showSymbol: look.showSymbol,
        // showAllSymbol (category axis only): 'auto' draws every symbol if there is room,
        // otherwise it follows the axis label interval; true forces all; false follows the interval.
        showAllSymbol: look.showAll,
        symbol: look.symbol,
        // symbolSize / symbolRotate accept (value, params) callbacks.
        symbolSize: look.callbacks ? (v: number) => Math.max(3, Math.abs(v - 50) / 1.5) : 6,
        symbolRotate: look.callbacks ? (v: number) => (v > 50 ? 0 : 180) : 0,
        lineStyle: { width: preview ? 2 : 1.5 },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { showSymbol: true, showAll: 'auto', symbol: 'emptyCircle', callbacks: false };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps: Array<Partial<Look>> = [
      { showAll: 'auto', callbacks: false, symbol: 'emptyCircle' },
      { showAll: true },
      { showAll: false },
      { callbacks: true, symbol: 'triangle', showAll: true },
    ];
    let n = 0;
    stop = every(1800, () => {
      Object.assign(look, steps[++n % steps.length]!);
      show();
    });
  } else {
    select(bar!, 'showSymbol', ['true', 'false'], (v) => {
      look.showSymbol = v === 'true';
      show();
    });
    select(bar!, 'showAllSymbol', ['auto', 'true', 'false'], (v) => {
      look.showAll = v === 'auto' ? 'auto' : v === 'true';
      show();
    });
    select(bar!, 'symbol', ['emptyCircle', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'], (v) => {
      look.symbol = v;
      show();
    });
    select(bar!, 'symbolSize / symbolRotate', ['fixed', 'callbacks'], (v) => {
      look.callbacks = v === 'callbacks';
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
