// Per-element enterFrom, enterAnimation, updateAnimation and transition on custom series circles
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

/** Initial properties (enterFrom) of an element, by preset name. */
const ENTER = {
  'fade in': { style: { opacity: 0 } },
  'scale up': { scaleX: 0, scaleY: 0 },
  'from the left edge': { x: 0, style: { opacity: 0 } },
  'from the top': { y: 0, style: { opacity: 0 } },
};
const EASINGS = ['cubicOut', 'elasticOut', 'bounceOut', 'backOut', 'linear'] as const;

const pick = (): { name: string; value: [number, number] }[] =>
  NAMES.map((name, i) => ({ name, value: [i, Math.round(10 + Math.random() * 80)] as [number, number] })).filter(() => Math.random() > 0.35);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let enter: keyof typeof ENTER = ctx.preview ? 'scale up' : 'fade in';
  let updateMs = 700;
  let enterMs = 700;
  let easing: (typeof EASINGS)[number] = 'cubicOut';

  const renderItem: CustomSeriesRenderItem = (_params, api) => {
    const [x, y] = api.coord([api.value(0), api.value(1)]) as [number, number];
    return {
      type: 'circle',
      // The circle is centred on its own origin and placed with x/y, so scale grows from the centre.
      shape: { cx: 0, cy: 0, r: 15 },
      x,
      y,
      style: { fill: api.visual('color') as string },
      // x and y are transitioned by default in a custom series; this makes it explicit.
      transition: ['x', 'y'],
      // Properties the element starts from when it is created.
      // (the typings insist on a shape key here, which a partial enterFrom does not need)
      enterFrom: ENTER[enter] as never,
      // Per-phase duration, delay and easing: one for entering, one for updating.
      enterAnimation: { duration: enterMs, easing: 'cubicOut' },
      updateAnimation: { duration: updateMs, easing },
    };
  };

  const render = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      grid: { top: 20, left: 36, right: 20, bottom: ctx.preview ? 24 : 40 },
      xAxis: { type: 'category', data: NAMES },
      yAxis: { type: 'value', min: 0, max: 100 },
      series: [{ type: 'custom', renderItem, colorBy: 'data', encode: { x: 0, y: 1 }, data: pick() }],
    });
  };
  render();
  const stop = every(ctx.preview ? 2300 : 2800, render);
  // The next update picks up a changed control.

  if (bar) {
    select(bar, 'enterFrom', Object.keys(ENTER), (v) => (enter = v as keyof typeof ENTER));
    slider(bar, 'enterAnimation.duration', [100, 1500, 100], enterMs, (v) => (enterMs = v));
    select(bar, 'updateAnimation.easing', EASINGS, (v) => (easing = v as typeof easing));
    slider(bar, 'updateAnimation.duration', [100, 1500, 100], updateMs, (v) => (updateMs = v));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
