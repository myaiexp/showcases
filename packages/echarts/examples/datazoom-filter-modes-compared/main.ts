// Four connected scatter charts, identical except for dataZoom filterMode, windowed on both axes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, button, echarts, every } from '../../shared/chart.ts';
import { points } from '../../shared/interaction-data.ts';

const MODES = ['filter', 'weakFilter', 'empty', 'none'] as const;
const data = points(160, 9).map((p) => [p[0]!, p[1]!]);
let groupCount = 0;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%';
  el.append(grid);
  // Connected charts (chart.group + echarts.connect) pass dataZoom actions to each other, so
  // one window drives all four; the dataZoom ids must match across the charts.
  const group = 'datazoom-filter-modes-' + ++groupCount;

  const charts = MODES.map((mode) => {
    const c = createChart(el, ctx, { parent: grid, height: 240, previewHeight: 98 });
    c.chart.group = group;
    c.chart.setOption({
      title: { text: 'filterMode: ' + mode, left: 'center', top: 0, textStyle: { fontSize: ctx.preview ? 11 : 13 } },
      grid: { top: ctx.preview ? 20 : 32, left: 34, right: ctx.preview ? 8 : 40, bottom: ctx.preview ? 14 : 44 },
      xAxis: { type: 'value', scale: true, axisLabel: { show: !ctx.preview } },
      yAxis: { type: 'value', scale: true, axisLabel: { show: !ctx.preview } },
      dataZoom: [
        // Both axes are windowed: the mode decides what a point outside one window does to the other axis.
        { id: 'zx', type: ctx.preview ? 'inside' : 'slider', xAxisIndex: 0, filterMode: mode, start: 20, end: 70, height: 16, bottom: 6, showDetail: false },
        { id: 'zy', type: ctx.preview ? 'inside' : 'slider', yAxisIndex: 0, filterMode: mode, start: 30, end: 100, width: 16, right: 6, showDetail: false },
      ],
      // 'empty' turns points outside a window into NaN, 'none' keeps every point.
      series: [{ type: 'scatter', symbolSize: ctx.preview ? 5 : 7, data }],
    });
    return c;
  });
  echarts.connect(group);

  let stop = (): void => {};
  if (bar) {
    button(bar, 'Narrow x to 40-60%', () => charts[0]!.chart.dispatchAction({ type: 'dataZoom', dataZoomId: 'zx', start: 40, end: 60 }));
    button(bar, 'Narrow y to 60-80%', () => charts[0]!.chart.dispatchAction({ type: 'dataZoom', dataZoomId: 'zy', start: 60, end: 80 }));
    button(bar, 'Reset both', () => {
      charts[0]!.chart.dispatchAction({ type: 'dataZoom', dataZoomId: 'zx', start: 20, end: 70 });
      charts[0]!.chart.dispatchAction({ type: 'dataZoom', dataZoomId: 'zy', start: 30, end: 100 });
    });
  } else {
    let t = 0;
    stop = every(1000, () => {
      t = (t + 1) % 6;
      const start = 10 + t * 8;
      charts[0]!.chart.dispatchAction({ type: 'dataZoom', dataZoomId: 'zx', start, end: start + 30 });
    });
  }

  return () => {
    stop();
    echarts.disconnect(group);
    for (const c of charts) c.dispose();
    grid.remove();
  };
};

export default mount;
