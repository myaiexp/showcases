// Scatter points whose symbol, size and rotation come from per-item fields and callbacks
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

type Mode = 'wind arrows (symbolRotate per item)' | 'symbol callback by value' | 'items override the series' | 'pin with symbolOffset';

// Hourly wind: [hour, speed, direction in degrees]. 0 degrees points up.
function wind(seed: number): number[][] {
  return Array.from({ length: 16 }, (_, h) => [h, Math.round(6 + 5 * Math.sin(h / 2.5 + seed) + 3 * Math.cos(h * 1.7 + seed * 2)), Math.round((h * 37 + seed * 90) % 360)]);
}

function build(mode: Mode, data: number[][], preview: boolean): EChartsOption {
  const base: EChartsOption = {
    tooltip: {},
    grid: { top: preview ? 14 : 24, left: 40, right: 16, bottom: preview ? 24 : 32 },
    xAxis: { type: 'value', min: -1, max: 16, name: preview ? '' : 'hour' },
    yAxis: { type: 'value', min: 0, max: 18, name: preview ? '' : 'speed' },
  };
  switch (mode) {
    case 'wind arrows (symbolRotate per item)':
      return {
        ...base,
        series: [
          {
            type: 'scatter',
            symbol: 'arrow',
            // symbolSize is a callback of the value: faster wind, bigger arrow.
            symbolSize: (v: number[]) => 8 + (v[1] ?? 0) * 1.6,
            // symbolRotate on each data item: degrees, negative is clockwise, so negate.
            data: data.map(([h, s, dir]) => ({ value: [h, s, dir], symbolRotate: -(dir ?? 0) })),
          },
        ],
      };
    case 'symbol callback by value':
      return {
        ...base,
        series: [
          {
            type: 'scatter',
            // (value, params) => symbol name: pick the shape from the value.
            symbol: (v: number[]) => ((v[1] ?? 0) >= 12 ? 'triangle' : (v[1] ?? 0) >= 6 ? 'diamond' : 'circle'),
            symbolSize: 16,
            data,
          },
        ],
      };
    case 'items override the series':
      return {
        ...base,
        series: [
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 12,
            // A data item given as an object may carry its own symbol, symbolSize and style.
            data: data.map((d, i) =>
              i % 5 === 0 ? { value: d, symbol: 'rect', symbolSize: 20, itemStyle: { color: '#fac858' } } : i % 7 === 3 ? { value: d, symbol: 'roundRect', symbolSize: [26, 12] } : d,
            ),
          },
        ],
      };
    case 'pin with symbolOffset':
      return {
        ...base,
        series: [
          // A pin is centred on its data point by default; [0, '-50%'] lifts it by half its height
          // so the tip marks the position.
          { type: 'scatter', name: 'centred', symbol: 'pin', symbolSize: 26, data: data.slice(0, 8), itemStyle: { opacity: 0.45 } },
          { type: 'scatter', name: 'offset', symbol: 'pin', symbolSize: 26, symbolOffset: [0, '-50%'], data: data.slice(0, 8) },
        ],
      };
  }
}

const modes: Mode[] = ['wind arrows (symbolRotate per item)', 'symbol callback by value', 'items override the series', 'pin with symbolOffset'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = modes[0]!;
  let data = wind(0);
  const show = (): void => {
    chart.setOption(build(mode, data, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2000, () => {
      i++;
      mode = modes[i % modes.length]!;
      data = wind(i);
      show();
    });
  } else {
    select(bar!, 'symbols', modes, (v) => {
      mode = v as Mode;
      show();
    });
    select(bar!, 'data', ['wind A', 'wind B', 'wind C'], (v) => {
      data = wind(v.charCodeAt(5) - 65);
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
