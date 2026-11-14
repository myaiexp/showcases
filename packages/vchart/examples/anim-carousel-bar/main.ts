// animationNormal carousel: growHeightOut then growHeightIn per bar, looping
import type { Mount } from '@/types.ts';
import { createChart } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const slice = (type: string, delay: number, duration: number) => ({
    delay,
    duration,
    effects: { type, easing: 'bounceOut' as const, options: { orient: 'negative' } },
  });
  const { release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'bars', values: [90, 115, 130, 125, 200].map((y, x) => ({ x: String(x), y })) }],
    xField: 'x',
    yField: 'y',
    seriesField: 'x',
    legends: { visible: false },
    bar: { style: { cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 } },
    animationNormal: {
      bar: [{ startTime: 350, oneByOne: 200, loop: true, timeSlices: [slice('growHeightOut', 600, 300), slice('growHeightIn', 600, 1200)] }],
    },
  });
  return release;
};

export default mount;
