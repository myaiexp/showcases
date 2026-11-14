// Root-level color palette, textStyle, backgroundColor gradients and darkMode on a four-series chart
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const palettes: Record<string, string[]> = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  warm: ['#d7263d', '#f46036', '#ff9f1c', '#ffd23f', '#c0392b'],
  cool: ['#1b4965', '#5fa8d3', '#62b6cb', '#bee9e8', '#7b9acc'],
  mono: ['#e8e8e8', '#b5b5b5', '#8a8a8a', '#5f5f5f', '#3c3c3c'],
};
const backgrounds: Record<string, EChartsOption['backgroundColor']> = {
  transparent: 'transparent',
  // Linear gradient: x, y to x2, y2 as fractions of the chart, colour stops from 0 to 1.
  'linear gradient': { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#243b55' }, { offset: 1, color: '#141e30' }] },
  'radial gradient': { type: 'radial', x: 0.5, y: 0.5, r: 0.7, colorStops: [{ offset: 0, color: '#f7f1e3' }, { offset: 1, color: '#d1ccc0' }] },
  'rgba tint': 'rgba(255, 200, 120, 0.2)',
};

interface Look { palette: string; font: string; size: number; background: string; darkMode: 'auto' | boolean }

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

function build(look: Look): EChartsOption {
  return {
    // The root palette is used in order for series without their own colour.
    color: palettes[look.palette]!,
    // textStyle at the root applies to every text that sets nothing itself.
    textStyle: { fontFamily: look.font, fontSize: look.size },
    backgroundColor: backgrounds[look.background]!,
    // darkMode 'auto' reads the text colour from the backgroundColor's brightness.
    darkMode: look.darkMode,
    title: { text: 'Quarterly output', left: 'center', top: 4 },
    tooltip: { trigger: 'axis' },
    legend: {},
    grid: { top: 48, left: 44, right: 16, bottom: 60 },
    xAxis: { type: 'category', data: quarters },
    yAxis: { type: 'value' },
    series: ['North', 'South', 'East', 'West'].map((name, i) => ({
      name,
      type: 'bar' as const,
      data: quarters.map((_, q) => 20 + ((i * 7 + q * 11) % 23) + i * 4),
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { palette: 'default', font: 'sans-serif', size: 12, background: 'linear gradient', darkMode: 'auto' };
  const show = (): void => {
    chart.setOption(build(look));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const pal = Object.keys(palettes);
    const bg = Object.keys(backgrounds);
    let i = 0;
    stop = every(1800, () => {
      i += 1;
      look.palette = pal[i % pal.length]!;
      look.background = bg[(i >> 1) % bg.length]!;
      look.font = i % 3 === 0 ? 'serif' : 'sans-serif';
      show();
    });
  } else {
    select(bar!, 'color', Object.keys(palettes), (v) => { look.palette = v; show(); });
    select(bar!, 'backgroundColor', Object.keys(backgrounds), (v) => { look.background = v; show(); });
    select(bar!, 'textStyle.fontFamily', ['sans-serif', 'serif', 'monospace'], (v) => { look.font = v; show(); });
    slider(bar!, 'fontSize', [9, 22, 1], look.size, (v) => { look.size = v; show(); });
    select(bar!, 'darkMode', ['auto', 'true', 'false'], (v) => { look.darkMode = v === 'auto' ? 'auto' : v === 'true'; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
