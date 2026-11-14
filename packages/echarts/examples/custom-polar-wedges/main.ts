// A custom series on a polar system: renderItem turns api.coord points into sector wedges
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const seasonal = (shift: number): number[] =>
  months.map((_, i) => Math.round(40 + 30 * Math.sin(((i + shift) / 12) * Math.PI * 2) + Math.random() * 15));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let data = seasonal(0);
  let fill = 0.85; // share of each category's angle the wedge covers
  let corner = 4;
  let direction: 'clockwise' | 'anticlockwise' = 'clockwise';

  /**
   * Data item: [value on the radius axis, category index on the angle axis]. On a polar
   * system api.coord returns the pixel point, params.coordSys carries cx, cy, r and r0.
   */
  const renderItem: CustomSeriesRenderItem = (params, api) => {
    const sys = params.coordSys as unknown as { cx: number; cy: number };
    const idx = api.value(1) as number;
    const [tx, ty] = api.coord([api.value(0), idx]) as [number, number];
    const [bx, by] = api.coord([0, idx]) as [number, number];
    const angle = Math.atan2(ty - sys.cy, tx - sys.cx);
    const half = (Math.PI / months.length) * fill;
    return {
      type: 'sector',
      shape: {
        cx: sys.cx,
        cy: sys.cy,
        r0: Math.hypot(bx - sys.cx, by - sys.cy),
        r: Math.hypot(tx - sys.cx, ty - sys.cy),
        startAngle: angle - half,
        endAngle: angle + half,
        cornerRadius: corner,
      },
      style: { fill: api.visual('color') as string },
    };
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      // polar.radius leaves a hole in the middle; the custom wedges start at the axis origin.
      polar: { radius: [ctx.preview ? 18 : 30, '78%'] },
      angleAxis: { type: 'category', data: months, clockwise: direction === 'clockwise', startAngle: 90, boundaryGap: false },
      radiusAxis: { min: 0, max: 100, axisLabel: { show: !ctx.preview } },
      series: [
        {
          type: 'custom',
          coordinateSystem: 'polar',
          renderItem,
          // x of the series is the radius axis here: dimension 0 is radius, dimension 1 is angle.
          encode: { radius: 0, angle: 1, tooltip: [0, 1] },
          colorBy: 'data',
          data: data.map((v, i) => [v, i]),
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      data = seasonal(Math.random() * 12);
      corner = Math.round(Math.random() * 8);
      show();
    });
  } else {
    slider(bar!, 'wedge width', [0.3, 1, 0.05], fill, (v) => {
      fill = v;
      show();
    });
    slider(bar!, 'corner radius', [0, 12, 1], corner, (v) => {
      corner = v;
      show();
    });
    select(bar!, 'angleAxis.clockwise', ['clockwise', 'anticlockwise'], (v) => {
      direction = v as typeof direction;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
