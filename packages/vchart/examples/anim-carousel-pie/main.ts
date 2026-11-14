// animationNormal on a pie: two parallel timelines, one dims once, one loops a highlight
import type { Mount } from '@/types.ts';
import { createChart } from '../../shared/chart.ts';

const radii: Record<string, number> = { A: 100, B: 95, C: 90, D: 85 };

const mount: Mount = (el, ctx) => {
  const k = ctx.preview ? 0.55 : 1;
  const radius = (d: Record<string, unknown>): number => (radii[String(d.name)] ?? 90) * k;
  const { release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'p', values: [{ name: 'A', value: 300 }, { name: 'B', value: 120 }, { name: 'C', value: 100 }, { name: 'D', value: 80 }] }],
    valueField: 'value',
    categoryField: 'name',
    seriesField: 'name',
    legends: { visible: false },
    label: { visible: false },
    pie: { style: { outerRadius: radius, innerRadius: 60 * k, cornerRadius: 2 } },
    animationNormal: {
      pie: [
        { startTime: 100, loop: 0, timeSlices: [{ duration: 500, effects: { channel: { fillOpacity: { to: 0.3 } } } }] },
        {
          startTime: 800,
          loop: true,
          oneByOne: true,
          timeSlices: [
            { duration: 500, effects: { channel: { fillOpacity: { to: 1 }, outerRadius: { to: (d: Record<string, unknown>) => radius(d) + 10 } } } },
            { duration: 500, effects: { channel: { fillOpacity: { to: 1 }, outerRadius: { to: (d: Record<string, unknown>) => radius(d) + 10 } }, easing: 'linear' } },
            { duration: 500, effects: { channel: { fillOpacity: { to: 0.3 }, outerRadius: { to: radius } } } },
          ],
        },
      ],
    },
  });
  return release;
};

export default mount;
