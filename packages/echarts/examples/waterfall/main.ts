// A waterfall built from stacked bars: an invisible helper series floats the colored deltas
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const labels = Array.from({ length: 11 }, (_, i) => `Oct/${i + 1}`);

// Split deltas into the three stacked series the handbook describes.
function split(deltas: number[]): { help: number[]; positive: Array<number | '-'>; negative: Array<number | '-'> } {
  const help: number[] = [];
  const positive: Array<number | '-'> = [];
  const negative: Array<number | '-'> = [];
  let sum = 0;
  deltas.forEach((d, i) => {
    positive.push(d >= 0 ? d : '-');
    negative.push(d < 0 ? -d : '-');
    // The helper is the running total below the visible bar: for a drop, it sits at the new, lower total.
    if (i === 0) help.push(0);
    else {
      sum += deltas[i - 1] ?? 0;
      help.push(d < 0 ? sum + d : sum);
    }
  });
  return { help, positive, negative };
}

function build(deltas: number[], preview: boolean): EChartsOption {
  const { help, positive, negative } = split(deltas);
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { top: 16, left: 40, right: 12, bottom: 24 },
    xAxis: { type: 'category', splitLine: { show: false }, data: labels },
    yAxis: { type: 'value' },
    series: [
      {
        // Helper: same stack, fully transparent, and silent so it has no hover or tooltip.
        type: 'bar',
        stack: 'all',
        silent: true,
        itemStyle: { color: 'transparent', borderColor: 'transparent' },
        emphasis: { disabled: true },
        tooltip: { show: false },
        data: help,
      },
      { name: 'Increase', type: 'bar', stack: 'all', data: positive, itemStyle: { color: '#52c41a' }, label: { show: !preview, position: 'inside', fontSize: 10 } },
      { name: 'Decrease', type: 'bar', stack: 'all', data: negative, itemStyle: { color: '#ff4d4f' }, label: { show: !preview, position: 'inside', fontSize: 10 } },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let deltas = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203];
  // Seeded wobble so "new data" and the preview loop change values but stay plausible.
  let seed = 5;
  const next = (): number => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const shuffle = (): void => {
    let total = 0;
    deltas = deltas.map((_, i) => {
      // Keep the running total positive so every floating bar stays above the axis.
      const d = i === 0 ? 700 + Math.round(next() * 300) : Math.round((next() - 0.4) * 500);
      const v = total + d < 0 ? Math.abs(d) : d;
      total += v;
      return v;
    });
    chart.setOption(build(deltas, ctx.preview));
  };
  chart.setOption(build(deltas, ctx.preview));

  let stop = (): void => {};
  if (ctx.preview) stop = every(2000, shuffle);
  else button(bar!, 'new data', shuffle);

  return () => {
    stop();
    dispose();
  };
};

export default mount;
