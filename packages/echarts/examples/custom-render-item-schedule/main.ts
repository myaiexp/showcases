// An x-range schedule drawn by a renderItem function, clipped to the grid and zoomable
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, echarts, every } from '../../shared/chart.ts';
import { MACHINES, schedule } from './data.ts';

/**
 * Called once per data item. api.value reads a dimension, api.coord turns data into
 * pixels, api.size turns a data span (one category) into pixels. The rect is clipped to
 * the grid (params.coordSys) with graphic.clipRectByRect so zoomed-out jobs don't spill.
 */
const makeRenderItem = (names: string[]): CustomSeriesRenderItem => (params, api) => {
  const row = api.value(0);
  const [x0, y] = api.coord([api.value(1), row]) as [number, number];
  const [x1] = api.coord([api.value(2), row]) as [number, number];
  const height = (api.size!([0, 1]) as number[])[1]! * 0.6;
  const sys = params.coordSys as unknown as { x: number; y: number; width: number; height: number };
  const shape = echarts.graphic.clipRectByRect(
    { x: x0, y: y - height / 2, width: x1 - x0, height },
    { x: sys.x, y: sys.y, width: sys.width, height: sys.height },
  );
  if (!shape) return null;
  return {
    type: 'group',
    children: [
      { type: 'rect', name: 'job', shape: { ...shape, r: 3 }, style: { fill: api.visual('color') as string } },
      {
        type: 'text',
        style: {
          text: shape.width > 26 ? (names[params.dataIndex] ?? '') : '',
          x: shape.x + 4,
          y: shape.y + shape.height / 2,
          verticalAlign: 'middle',
          fill: '#fff',
          font: api.font({ fontSize: 10 }),
        },
      },
    ],
  };
};

const COLORS = ['#5b8ff9', '#5ad8a6', '#f6bd16', '#e86452', '#6dc8ec', '#9270ca'];

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  const jobs = schedule();
  // Dimension 0 is the machine row, 1–2 the span. The job name is the item's `name`,
  // which the tooltip shows; renderItem reads it by params.dataIndex.
  const data = jobs.map(([m, start, end, name]) => ({
    name,
    value: [m, start, end],
    itemStyle: { color: COLORS[m % COLORS.length] },
  }));

  chart.setOption({
    tooltip: { show: !ctx.preview },
    grid: ctx.preview ? { top: 8, bottom: 22, left: 44, right: 8 } : { left: 60, right: 30, bottom: 70 },
    // filterMode 'weakFilter' keeps a job while any part of it is inside the window.
    dataZoom: [
      { type: 'slider', xAxisIndex: 0, filterMode: 'weakFilter', show: !ctx.preview, start: 0, end: 50 },
      { type: 'inside', xAxisIndex: 0, filterMode: 'weakFilter', start: 0, end: 50 },
    ],
    xAxis: {
      type: 'value',
      min: 0,
      max: 24,
      // The window edges land between hours, so labels are formatted as h:mm.
      axisLabel: { formatter: (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}` },
    },
    yAxis: { type: 'category', data: MACHINES },
    series: [
      {
        type: 'custom',
        renderItem: makeRenderItem(jobs.map((j) => j[3])),
        dimensions: ['machine', 'start', 'end'],
        // x spans dimensions 1 and 2, y is the machine row; tooltip lists start and end.
        encode: { x: [1, 2], y: 0, tooltip: [1, 2] },
        data,
      },
    ],
  });

  // Named elements returned from renderItem can be targeted in event queries.
  chart.on('click', { element: 'job' }, (params) => {
    chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: params.dataIndex });
  });

  // Pan the 12-hour window across the day an hour at a time; renderItem runs again for
  // each step, and each step's update animation finishes before the next.
  let start = 0;
  const stop = every(1100, () => {
    start = (start + 100 / 24) % 50;
    chart.dispatchAction({ type: 'dataZoom', start, end: start + 50 });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
