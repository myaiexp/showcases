// Candlestick colour conventions: itemStyle color, color0, borderColor, borderColor0 and borderColorDoji
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { makeStock } from '../../shared/stock-data.ts';

const stock = makeStock(48, 21);

interface Palette { color: string; color0: string; borderColor: string; borderColor0: string; borderColorDoji: string }
const PALETTES: Record<string, Palette> = {
  'green up / red down': { color: '#26a69a', color0: '#ef5350', borderColor: '#26a69a', borderColor0: '#ef5350', borderColorDoji: '#cccccc' },
  'red up / green down': { color: '#ef5350', color0: '#26a69a', borderColor: '#ef5350', borderColor0: '#26a69a', borderColorDoji: '#cccccc' },
  'hollow up': { color: 'transparent', color0: '#5470c6', borderColor: '#5470c6', borderColor0: '#5470c6', borderColorDoji: '#fac858' },
  'blue up / orange down': { color: '#5470c6', color0: '#fc8452', borderColor: '#3b4f94', borderColor0: '#b85a2e', borderColorDoji: '#ffffff' },
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let name = 'green up / red down';
  let borderWidth = 1;

  const show = (): void => {
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 50, right: 16, top: 16, bottom: ctx.preview ? 22 : 36 },
      xAxis: { type: 'category', data: stock.dates },
      yAxis: { scale: true, splitArea: { show: false } },
      series: [
        {
          type: 'candlestick',
          data: stock.oclh,
          // color / borderColor: bullish candles (close above open).
          // color0 / borderColor0: bearish candles. borderColorDoji: open equals close.
          itemStyle: { ...PALETTES[name]!, borderWidth },
        },
      ],
    });
  };
  show();

  const names = Object.keys(PALETTES);
  let n = 0;
  const stop = ctx.preview
    ? every(1600, () => {
        name = names[++n % names.length]!;
        show();
      })
    : () => {};
  if (bar) {
    select(bar, 'itemStyle preset', names, (v) => {
      name = v;
      show();
    });
    slider(bar, 'borderWidth', [0, 4, 0.5], borderWidth, (v) => {
      borderWidth = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
