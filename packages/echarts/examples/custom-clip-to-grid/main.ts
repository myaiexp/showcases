// A group of children clipped to the grid with clipRectByRect and clipPointsByRect while dataZoom pans
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';

const LANES = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

/** [lane, start, end, peak height as a share of the lane]; spans overlap the zoom window edges. */
function spans(): number[][] {
  const out: number[][] = [];
  LANES.forEach((_, lane) => {
    let t = Math.random() * 8;
    while (t < 100) {
      const len = 8 + Math.random() * 16;
      out.push([lane, t, t + len, 0.45 + Math.random() * 0.4]);
      t += len + 2 + Math.random() * 8;
    }
  });
  return out;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let data = spans();
  let clip = true;

  /**
   * One group per item: a thin base rect clipped with clipRectByRect and a pennant polygon
   * clipped with clipPointsByRect. Both take the grid rectangle from params.coordSys.
   */
  const renderItem: CustomSeriesRenderItem = (params, api) => {
    const lane = api.value(0) as number;
    const [x0, y] = api.coord([api.value(1), lane]) as [number, number];
    const [x1] = api.coord([api.value(2), lane]) as [number, number];
    const laneH = (api.size!([0, 1]) as number[])[1]!;
    const sys = params.coordSys as unknown as { x: number; y: number; width: number; height: number };
    const grid = { x: sys.x, y: sys.y, width: sys.width, height: sys.height };
    const baseY = y + laneH * 0.3;
    const apexY = baseY - laneH * 0.8 * (api.value(3) as number);
    const color = api.visual('color') as string;

    const rect = { x: x0, y: baseY, width: x1 - x0, height: 5 };
    const points: number[][] = [[x0, baseY], [(x0 + x1) / 2, apexY], [x1, baseY]];
    const rectShape = clip ? echarts.graphic.clipRectByRect(rect, grid) : rect;
    const polyPoints = clip ? echarts.graphic.clipPointsByRect(points, grid) : points;
    if (!rectShape || polyPoints.length < 3) return null; // fully outside the window: draw nothing
    return {
      type: 'group',
      children: [
        { type: 'polygon', shape: { points: polyPoints as [number, number][] }, style: { fill: color, opacity: 0.75 } },
        { type: 'rect', shape: rectShape, style: { fill: color } },
      ],
    };
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      animation: !ctx.preview, // the preview pans every 250 ms, faster than an update animation
      grid: { top: 12, left: 60, right: 24, bottom: ctx.preview ? 24 : 70 },
      // weakFilter keeps an item while any of its dimensions is still inside the window.
      dataZoom: [
        { type: 'slider', show: !ctx.preview, xAxisIndex: 0, filterMode: 'weakFilter', start: 25, end: 55 },
        { type: 'inside', xAxisIndex: 0, filterMode: 'weakFilter', start: 25, end: 55 },
      ],
      xAxis: { type: 'value', min: 0, max: 110 },
      yAxis: { type: 'category', data: LANES },
      series: [{ type: 'custom', renderItem, colorBy: 'series', encode: { x: [1, 2], y: 0 }, data }],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Pan the window back and forth: the shapes are cut at the grid edges as they pass.
    let t = 0;
    stop = every(250, () => {
      t += 0.08;
      const start = 30 + 25 * Math.sin(t);
      chart.dispatchAction({ type: 'dataZoom', start, end: start + 30 });
    });
  } else {
    select(bar!, 'clipping', ['clipped to the grid', 'not clipped'], (v) => {
      clip = v === 'clipped to the grid';
      show();
    });
    button(bar!, 'new data', () => {
      data = spans();
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
