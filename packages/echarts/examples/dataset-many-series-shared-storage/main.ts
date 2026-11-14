// A dataset with up to 600 columns and one line series per column, timing each setOption
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';

const ROWS = 10;
const MAX = 600;

// Row 0 names the dimensions ("index0" ... as in the release note); the other rows are values.
function makeSource(count: number): (string | number)[][] {
  const header = ['date', ...Array.from({ length: count }, (_, i) => `index${i}`)];
  const rows = Array.from({ length: ROWS }, (_, r) => [r, ...Array.from({ length: count }, (_, i) => Math.round(50 + 40 * Math.sin(r / 2 + i * 0.37) + (i % 7) * 3))]);
  return [header, ...rows];
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const readout = document.createElement('div');
  readout.style.cssText = 'font:12px/1.6 monospace;opacity:.9;padding-top:4px';
  if (!ctx.preview) el.append(readout);

  const show = (count: number): void => {
    const option: EChartsOption = {
      animation: false,
      legend: { show: false },
      grid: { top: 16, left: 40, right: 16, bottom: 28 },
      // All series read this one dataset; encode picks the column each one draws.
      dataset: { source: makeSource(count) },
      xAxis: { type: 'category' },
      yAxis: {},
      series: Array.from({ length: count }, (_, i) => ({
        type: 'line' as const,
        name: `index${i}`,
        showSymbol: false,
        lineStyle: { width: 1, opacity: 0.6 },
        encode: { x: 'date', y: `index${i}` },
      })),
    };
    const t0 = performance.now();
    // notMerge: the series count changes between states.
    chart.setOption(option, true);
    readout.textContent = `${count} series x ${ROWS} rows: setOption took ${(performance.now() - t0).toFixed(0)} ms`;
  };
  show(100);

  let stop = (): void => {};
  if (ctx.preview) {
    const counts = [100, 300, 600, 200];
    let i = 0;
    stop = every(2000, () => show(counts[++i % counts.length]!));
  } else {
    slider(bar!, 'series', [10, MAX, 10], 100, show);
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
