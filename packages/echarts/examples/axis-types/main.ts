// The four axis types side by side: category, value, time and log
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

// Small seeded PRNG so the data is the same on every load.
function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const DAY = 86400000;
const start = Date.UTC(2026, 0, 1);

function build(rand: () => number, logBase: number, preview: boolean): EChartsOption {
  // Four grids, each with its own pair of axes, wired up through gridIndex.
  const cells = [
    { left: '6%', top: preview ? '14%' : '10%' },
    { left: '56%', top: preview ? '14%' : '10%' },
    { left: '6%', top: '58%' },
    { left: '56%', top: '58%' },
  ];
  const grid = cells.map((c) => ({ ...c, width: '38%', height: preview ? '28%' : '30%' }));
  const names = ['category', 'value', 'time', 'log'];
  return {
    animationDurationUpdate: 800,
    grid,
    title: names.map((text, i) => ({
      text: `type: '${text}'`,
      left: cells[i]?.left,
      top: i < 2 ? 0 : '48%',
      textStyle: { fontSize: preview ? 10 : 13 },
    })),
    xAxis: [
      // category: labels come from data, positions are indexes.
      { gridIndex: 0, type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      // value: a continuous numeric axis (the default type).
      { gridIndex: 1, type: 'value' },
      // time: values are timestamps and labels are formatted as dates.
      { gridIndex: 2, type: 'time' },
      { gridIndex: 3, type: 'value' },
    ],
    yAxis: [
      { gridIndex: 0, type: 'value' },
      { gridIndex: 1, type: 'value' },
      { gridIndex: 2, type: 'value' },
      // log: equal steps on the axis are equal ratios; needs positive data.
      { gridIndex: 3, type: 'log', logBase },
    ],
    series: [
      { type: 'bar', xAxisIndex: 0, yAxisIndex: 0, data: Array.from({ length: 5 }, () => Math.round(10 + rand() * 30)) },
      { type: 'scatter', xAxisIndex: 1, yAxisIndex: 1, data: Array.from({ length: 24 }, () => [rand() * 100, rand() * 100]) },
      { type: 'line', xAxisIndex: 2, yAxisIndex: 2, showSymbol: false, data: Array.from({ length: 20 }, (_, i) => [start + i * 3 * DAY, Math.round(20 + rand() * 40)]) },
      { type: 'line', xAxisIndex: 3, yAxisIndex: 3, data: Array.from({ length: 8 }, (_, i) => [i, Math.round(Math.pow(logBase, i) * (0.8 + rand() * 0.4))]) },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const rand = rng(7);
  let logBase = 10;
  const refresh = (): void => {
    chart.setOption(build(rand, logBase, ctx.preview));
  };
  refresh();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2200, refresh);
  } else {
    select(bar!, 'yAxis.logBase', ['10', '2', '3'], (v) => {
      logBase = Number(v);
      refresh();
    });
    button(bar!, 'new data', refresh);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
