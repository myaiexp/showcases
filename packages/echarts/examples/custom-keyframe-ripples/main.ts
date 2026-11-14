// Custom series points that emit looping ripples through keyframeAnimation on circle elements
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, select, slider } from '../../shared/chart.ts';

/** [x, y, magnitude] sensor readings; the magnitude sets how far the ripples travel. */
function readings(): number[][] {
  return Array.from({ length: 9 }, () => [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(20 + Math.random() * 60)]);
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 400 });
  let data = readings();
  let rings = 3;
  let duration = 3000;
  let squash = 1; // scaleY at the end of a ripple; below 1 the rings flatten into ellipses

  const renderItem: CustomSeriesRenderItem = (_params, api) => {
    const [x, y] = api.coord([api.value(0), api.value(1)]) as [number, number];
    const reach = (api.value(2) as number) * 0.7;
    const color = api.visual('color') as string;
    const circles = [];
    for (let i = 0; i < rings; i++) {
      circles.push({
        type: 'circle' as const,
        shape: { cx: 0, cy: 0, r: reach },
        style: { stroke: color, fill: 'none', lineWidth: 2 },
        // Each ring runs the same two keyframes, started a fraction of a loop apart;
        // a negative delay means it begins part-way through the cycle.
        keyframeAnimation: {
          duration,
          loop: true,
          delay: (-i / rings) * duration,
          keyframes: [
            { percent: 0, scaleX: 0, scaleY: 0, style: { opacity: 1 } },
            { percent: 1, scaleX: 1, scaleY: squash, style: { opacity: 0 } },
            // (the typings want a shape in each keyframe, which these keyframes do not change)
          ] as never,
        },
      });
    }
    return {
      type: 'group',
      // Placing the group at the point makes every ring scale around it.
      x,
      y,
      children: [...circles, { type: 'circle', shape: { cx: 0, cy: 0, r: 4 }, style: { fill: color } }],
    };
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      grid: { top: 16, left: 36, right: 16, bottom: ctx.preview ? 24 : 40 },
      xAxis: { type: 'value', min: 0, max: 100 },
      yAxis: { type: 'value', min: 0, max: 100 },
      series: [{ type: 'custom', renderItem, colorBy: 'data', encode: { x: 0, y: 1, tooltip: [0, 1, 2] }, data }],
    });
  };
  show();

  if (bar) {
    slider(bar, 'rings', [1, 6, 1], rings, (v) => {
      rings = v;
      show();
    });
    slider(bar, 'duration (ms)', [800, 6000, 200], duration, (v) => {
      duration = v;
      show();
    });
    select(bar, 'end scaleY', ['1', '0.4', '0.15'], (v) => {
      squash = Number(v);
      show();
    });
    button(bar, 'new readings', () => {
      data = readings();
      show();
    });
  }

  return dispose;
};

export default mount;
