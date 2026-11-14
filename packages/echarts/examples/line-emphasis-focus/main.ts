// emphasis.focus / blurScope / scale and the blur state across two grids
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const cats = ['1', '2', '3', '4', '5', '6', '7', '8'];
const data = Array.from({ length: 6 }, (_, i) => walk(8, 40 + i, 30 + (i % 3) * 12, 4));

interface Look { focus: 'none' | 'self' | 'series'; blurScope: 'coordinateSystem' | 'series' | 'global'; scale: number; blurOpacity: number }

function build(look: Look, preview: boolean): EChartsOption {
  const small = preview;
  return {
    tooltip: { trigger: 'item' },
    legend: preview ? { show: false } : {},
    grid: [
      { top: small ? 8 : 24, height: small ? '36%' : '30%', left: 36, right: 16 },
      { top: small ? '56%' : '56%', height: small ? '30%' : '26%', left: 36, right: 16 },
    ],
    xAxis: [
      { type: 'category', data: cats, gridIndex: 0, show: !small },
      { type: 'category', data: cats, gridIndex: 1 },
    ],
    yAxis: [
      { type: 'value', gridIndex: 0, scale: true, splitNumber: 3 },
      { type: 'value', gridIndex: 1, scale: true, splitNumber: 3 },
    ],
    series: data.map((d, i) => ({
      name: `line ${i + 1}`,
      type: 'line' as const,
      data: d,
      xAxisIndex: i < 3 ? 0 : 1,
      yAxisIndex: i < 3 ? 0 : 1,
      symbolSize: 6,
      emphasis: {
        // focus: what stays at full strength while a point is hovered (or highlighted).
        focus: look.focus,
        // blurScope: how far the fading reaches; only matters when focus is not 'none'.
        blurScope: look.blurScope,
        // scale: how much the hovered symbol grows (a number is the factor).
        scale: look.scale,
      },
      // blur: the style of everything that is faded out.
      blur: { lineStyle: { opacity: look.blurOpacity }, itemStyle: { opacity: look.blurOpacity } },
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { focus: 'series', blurScope: 'coordinateSystem', scale: 1.8, blurOpacity: 0.15 };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Without a pointer, highlight a series from code, as a hover would.
    let n = 0;
    let prev = -1;
    stop = every(1100, () => {
      if (prev >= 0) chart.dispatchAction({ type: 'downplay', seriesIndex: prev });
      prev = n % 6;
      chart.dispatchAction({ type: 'highlight', seriesIndex: prev });
      n += 1;
    });
  } else {
    select(bar!, 'focus', ['series', 'self', 'none'], (v) => {
      look.focus = v as Look['focus'];
      show();
    });
    select(bar!, 'blurScope', ['coordinateSystem', 'series', 'global'], (v) => {
      look.blurScope = v as Look['blurScope'];
      show();
    });
    slider(bar!, 'scale', [1, 3, 0.1], look.scale, (v) => {
      look.scale = v;
      show();
    });
    slider(bar!, 'blur opacity', [0, 1, 0.05], look.blurOpacity, (v) => {
      look.blurOpacity = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
