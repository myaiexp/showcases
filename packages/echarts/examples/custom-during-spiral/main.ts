// Dots that follow a spiral because a during callback computes x and y from an interpolated extra.degree
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const MAX_DEGREE = 1080;
const COUNT = 7;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });
  let follow = true;
  let duration = 1800;
  let degrees = Array.from({ length: COUNT }, (_, i) => (i / COUNT) * MAX_DEGREE);

  /** A point on the spiral for a given angle: the radius grows linearly with the degree. */
  const spiral = (degree: number, cx: number, cy: number, radius: number): [number, number] => {
    const a = (degree * Math.PI) / 180;
    const r = 8 + ((radius - 8) * degree) / MAX_DEGREE;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  /** Series 1: one dot per data item. Data is [dot index, target degree]. */
  const renderDot: CustomSeriesRenderItem = (_params, api) => {
    const cx = api.getWidth() / 2;
    const cy = api.getHeight() / 2;
    const radius = Math.min(cx, cy) - 10;
    const degree = api.value(1) as number;
    const [x, y] = spiral(degree, cx, cy, radius);
    const color = api.visual('color') as string;
    if (!follow) {
      // Without during, x and y are interpolated directly: each dot runs in a straight line.
      return { type: 'circle', shape: { cx: 0, cy: 0, r: 9 }, x, y, transition: ['x', 'y'], style: { fill: color }, updateAnimation: { duration } };
    }
    return {
      type: 'circle',
      shape: { cx: 0, cy: 0, r: 9 },
      x,
      y,
      style: { fill: color },
      // extra is the user's own prop bag; transitioning it makes ECharts interpolate degree itself.
      extra: { degree },
      transition: 'extra',
      updateAnimation: { duration },
      // Runs on every animation frame: read the interpolated degree, set the matching x and y.
      during: (duringAPI) => {
        const d = duringAPI.getExtra('degree') as number;
        const [px, py] = spiral(d, cx, cy, radius);
        duringAPI.setTransform('x', px);
        duringAPI.setTransform('y', py);
      },
    };
  };

  /** Series 2: the spiral itself as one polyline, so the reader can see the path. */
  const renderGuide: CustomSeriesRenderItem = (_params, api) => {
    const cx = api.getWidth() / 2;
    const cy = api.getHeight() / 2;
    const radius = Math.min(cx, cy) - 10;
    const points: [number, number][] = [];
    for (let d = 0; d <= MAX_DEGREE; d += 10) points.push(spiral(d, cx, cy, radius));
    return { type: 'polyline', shape: { points }, style: { stroke: 'rgba(255,255,255,0.18)', fill: 'none', lineWidth: 1 }, silent: true };
  };

  const show = (): void => {
    chart.setOption({
      animationDurationUpdate: duration,
      series: [
        { id: 'guide', type: 'custom', coordinateSystem: 'none', renderItem: renderGuide, data: [[0]], silent: true },
        { id: 'dots', type: 'custom', coordinateSystem: 'none', renderItem: renderDot, colorBy: 'data', data: degrees.map((d, i) => [i, d]), z: 5 },
      ],
    });
  };
  show();

  const move = (): void => {
    degrees = degrees.map(() => Math.round(Math.random() * MAX_DEGREE));
    show();
  };
  const stop = every(ctx.preview ? 2400 : 2800, move);

  if (bar) {
    select(bar, 'motion', ['follow the spiral (during)', 'straight lines (transition x, y)'], (v) => {
      follow = v.startsWith('follow');
      // A different element definition per mode: rebuild so old elements do not keep the other mode's props.
      chart.clear();
      show();
    });
    slider(bar, 'duration', [400, 3000, 200], duration, (v) => (duration = v));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
