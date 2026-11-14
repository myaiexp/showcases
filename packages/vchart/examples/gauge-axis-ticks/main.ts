// Gauge angle axis: a linear axis with min, max, tickCount and label formatMethod turns the dial into a scale
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { createChart, controlBar, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = (ticks: number) => ({
    type: 'gauge' as const,
    data: [{ id: 'speed', values: [{ type: 'Speed', value: 135 }] }],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.8,
    innerRadius: 0.65,
    startAngle: -210,
    endAngle: 30,
    axes: [
      {
        orient: 'angle' as const,
        type: 'linear' as const,
        min: 0,
        max: 240,
        radius: 0.8,
        tick: { visible: true, tickCount: ticks },
        label: { visible: true, formatMethod: (v: string | string[]) => `${v}`, style: { fontSize: ctx.preview ? 10 : 13 } },
        domainLine: { visible: false },
      },
    ],
  });
  let ticks = 9;
  const { vchart, release } = createChart(el, ctx, spec(ticks));
  const r = rng(13);
  let timer = (): void => {};
  if (bar) {
    slider(bar, 'tickCount', [3, 25, 1], ticks, (v) => {
      ticks = v;
      void vchart.updateSpec(spec(ticks));
    });
  }
  // The reading follows the axis scale, 0 to 240, and the pointer moves along it.
  timer = every(2000, () => {
    void vchart.updateData('speed', [{ type: 'Speed', value: Math.round(r() * 240) }]);
  });
  return () => {
    timer();
    release();
  };
};

export default mount;
