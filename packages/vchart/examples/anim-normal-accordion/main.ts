// animationNormal: one looping timeline of two time slices, staggered with oneByOne
import type { Mount } from '@/types.ts';
import { createChart } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const r = rng(4);
  const values = Array.from({ length: ctx.preview ? 10 : 16 }, (_, i) => ({ x: String(i + 1), y: Math.round(10 + r() * 40) }));
  const { release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'bars', values }],
    xField: 'x',
    yField: 'y',
    axes: [{ orient: 'bottom', type: 'band' }, { orient: 'left', type: 'linear' }],
    animationNormal: {
      bar: [
        {
          loop: true,
          startTime: 100,
          oneByOne: 100,
          timeSlices: [
            { delay: 600, duration: 500, effects: { channel: { fillOpacity: { to: 0.25 } }, easing: 'linear' } },
            { duration: 500, effects: { channel: { fillOpacity: { to: 1 } }, easing: 'linear' } },
          ],
        },
      ],
    },
  });
  return release;
};

export default mount;
