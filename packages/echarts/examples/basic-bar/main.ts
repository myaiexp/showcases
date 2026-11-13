// Multi-series bars with itemStyle, barWidth, barGap, barCategoryGap and background bars
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Look { barWidth: string | number; gap: string; background: boolean; rounded: boolean }

function build(a: number[], b: number[], look: Look): EChartsOption {
  return {
    tooltip: {},
    legend: {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: 36, left: 36, right: 16, bottom: 60 },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'This week',
        type: 'bar',
        data: a,
        // barWidth: a fixed size or a percentage of the category width.
        barWidth: look.barWidth,
        // barGap: space between bars of one category; barCategoryGap: space between categories.
        // Both are shared by the bars on a coordinate system, so set them on the last series.
        // showBackground draws a full-height bar behind each value, styled by backgroundStyle.
        showBackground: look.background,
        backgroundStyle: { color: 'rgba(180, 180, 180, 0.15)' },
        // itemStyle: per-series style; a data item can override it with its own itemStyle.
        itemStyle: { borderRadius: look.rounded ? [5, 5, 0, 0] : 0 },
      },
      {
        name: 'Last week',
        type: 'bar',
        data: b.map((v, i) => (i === 3 ? { value: v, itemStyle: { color: '#91cc75', borderType: 'dashed', opacity: 0.6 } } : v)),
        barWidth: look.barWidth,
        barGap: look.gap,
        barCategoryGap: '40%',
        itemStyle: { borderRadius: look.rounded ? [5, 5, 0, 0] : 0 },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = (): number[] => days.map(() => Math.round(10 + Math.random() * 20));
  let a = [23, 24, 18, 25, 27, 28, 25];
  let b = [26, 24, 18, 22, 23, 20, 27];
  const look: Look = { barWidth: 20, gap: '20%', background: true, rounded: true };
  const show = (): void => {
    chart.setOption(build(a, b, look));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1800, () => {
      a = rand();
      b = rand();
      show();
    });
  } else {
    select(bar!, 'barWidth', ['20', '10', '36', '20%', '45%'], (v) => {
      look.barWidth = v.endsWith('%') ? v : Number(v);
      show();
    });
    select(bar!, 'barGap', ['20%', '-100%', '0%', '80%'], (v) => {
      look.gap = v;
      show();
    });
    const bg = button(bar!, 'showBackground: on', () => {
      look.background = !look.background;
      bg.textContent = `showBackground: ${look.background ? 'on' : 'off'}`;
      show();
    });
    const rd = button(bar!, 'borderRadius: on', () => {
      look.rounded = !look.rounded;
      rd.textContent = `borderRadius: ${look.rounded ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'new data', () => {
      a = rand();
      b = rand();
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
