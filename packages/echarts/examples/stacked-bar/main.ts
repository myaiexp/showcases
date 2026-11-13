// Stacked bars: series sharing a stack name pile up, with two separate stacks side by side
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E'];
// Four series in two groups, like the handbook's male / female example.
const series = [
  { name: 'Adult male', group: 'male', data: [10, 22, 28, 43, 49] },
  { name: 'Boy', group: 'male', data: [5, 4, 3, 5, 10] },
  { name: 'Adult female', group: 'female', data: [12, 18, 24, 30, 36] },
  { name: 'Girl', group: 'female', data: [6, 9, 4, 7, 12] },
];

function build(stacked: boolean, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: preview ? 16 : 40, left: 36, right: 16, bottom: preview ? 24 : 60 },
    xAxis: { type: 'category', data: cats },
    yAxis: {},
    series: series.map((s) => ({
      name: s.name,
      type: 'bar' as const,
      // Series with the same `stack` string are stacked together; leave it out to unstack.
      stack: stacked ? s.group : '',
      // Series of different stacks sit next to each other in a category.
      emphasis: { focus: 'series' as const },
      data: s.data,
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let stacked = true;
  const show = (): void => {
    chart.setOption(build(stacked, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1800, () => {
      stacked = !stacked;
      show();
    });
  } else {
    const b = button(bar!, 'stack: on', () => {
      stacked = !stacked;
      b.textContent = `stack: ${stacked ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
