// easing as a function (t: 0..1) => eased t, on a bar update animation
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { weekdayRows } from '../../shared/anim-data.ts';

const EASINGS: Record<string, (t: number) => number> = {
  'steps (5)': (t) => Math.floor(t * 5) / 5 + (t >= 1 ? 0.2 : 0),
  'overshoot': (t) => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2),
  'wobble': (t) => 1 - Math.cos(t * Math.PI * 5) * Math.pow(1 - t, 2),
  'smoothstep': (t) => t * t * (3 - 2 * t),
};
const NAMES = Object.keys(EASINGS);

const mount: Mount = (el, ctx) => {
  let easing = NAMES[0] ?? '';
  const spec = (): ISpec =>
    ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(2) }],
      xField: 'day',
      yField: 'sales',
      legends: { visible: false },
      tooltip: { visible: false },
      axes: [{ orient: 'left', type: 'linear', min: 0, max: 60 }, { orient: 'bottom', type: 'band' }],
      animationUpdate: {
        // Per-mark configuration is where a function is accepted as `easing`.
        bar: { type: 'update', duration: 1400, easing: EASINGS[easing] },
      },
    }) as unknown as ISpec;
  const chart = createChart(el, ctx, spec());
  let seed = 2;
  let alive = true;
  const next = (): void => {
    if (alive) void chart.vchart.updateData('sales', weekdayRows(++seed));
  };
  let stop = every(2200, next);
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.insertBefore(bar, chart.container);
    select(bar, 'easing function', NAMES, (v) => {
      easing = v;
      void chart.vchart.updateSpec(spec());
      stop();
      next();
      stop = every(2200, next);
    });
  } else {
    let i = 0;
    const rotate = every(4400, () => {
      easing = NAMES[++i % NAMES.length] ?? '';
      if (alive) void chart.vchart.updateSpec(spec());
    });
    const old = stop;
    stop = () => {
      old();
      rotate();
    };
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
