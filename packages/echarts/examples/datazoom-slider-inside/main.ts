// dataZoom: a slider and an inside zoom bound to one long series, with filterMode choices
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const N = 500;
const xs = Array.from({ length: N }, (_, i) => i);
const ys = xs.map((i) => Math.round((Math.sin(i / 17) * 40 + Math.sin(i / 5) * 10 + i / 8 + 50) * 10) / 10);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });

  const apply = (filterMode: string): void => {
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 50, right: 20, top: 20, bottom: ctx.preview ? 20 : 90 },
      xAxis: { type: 'category', data: xs },
      yAxis: { type: 'value', scale: true },
      dataZoom: [
        // inside: mouse wheel zooms, drag pans (no visible UI).
        { type: 'inside', xAxisIndex: 0, filterMode, start: 0, end: 20 },
        // slider: a visible bar with handles, bound to the same axis so the two stay in sync.
        { type: 'slider', xAxisIndex: 0, filterMode, show: !ctx.preview, start: 0, end: 20, bottom: 20, height: 36, brushSelect: true },
      ],
      series: [{ type: 'line', data: ys, showSymbol: false, areaStyle: { opacity: 0.2 }, sampling: 'lttb' }],
    });
  };
  apply('filter'); // filterMode 'filter' drops data outside the window; 'none' keeps it for other axes

  if (bar) {
    select(bar, 'filterMode', ['filter', 'weakFilter', 'empty', 'none'], apply);
    // dataZoom action: the same thing the slider sends while dragging.
    button(bar, 'Show first 10%', () => chart.dispatchAction({ type: 'dataZoom', start: 0, end: 10 }));
    button(bar, 'Show middle 50%', () => chart.dispatchAction({ type: 'dataZoom', start: 25, end: 75 }));
    button(bar, 'Reset', () => chart.dispatchAction({ type: 'dataZoom', start: 0, end: 100 }));
  }

  // Both cases: pan a window back and forth along the data. Steps are a second apart so
  // each one finishes its update animation; faster steps pile up moving axis labels.
  let start = 0;
  let dir = 1;
  const stop = every(1000, () => {
    start += dir * 5;
    if (start > 75 || start < 0) dir = -dir;
    chart.dispatchAction({ type: 'dataZoom', start, end: start + 25 });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
