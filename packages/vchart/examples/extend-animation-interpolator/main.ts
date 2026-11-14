// animationUpdate.bar.custom: an interpolator function that springs y towards its target
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  let wobbles = 2.5;
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'sales', values: weekdayRows(2) }],
    xField: 'day',
    yField: 'sales',
    animationUpdate: {
      bar: {
        channel: ['y'],
        duration: 1400,
        // (ratio, from, to, nextAttributes): write the next frame's attributes yourself.
        custom: (ratio: number, from: { y?: number }, to: { y?: number }, next: Record<string, number>) => {
          if (from.y === undefined || to.y === undefined) return;
          const spring = ratio >= 1 ? 1 : 1 - Math.exp(-5 * ratio) * Math.cos(ratio * Math.PI * 2 * wobbles);
          next.y = from.y + (to.y - from.y) * spring;
        },
      },
    },
  });
  const chart = createChart(el, ctx, spec());
  if (!ctx.preview) {
    slider(controlBar(el), 'wobbles', [0.5, 5, 0.5], wobbles, (v) => {
      wobbles = v;
    });
    el.insertBefore(el.lastElementChild as Element, chart.container);
  }
  let i = 2;
  let alive = true;
  const stop = every(2600, () => {
    if (alive) void chart.vchart.updateData('sales', weekdayRows(++i));
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
