// animationAppear.bar.channel: from/to values per visual channel, including function values
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { slider } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) =>
  mountReplay<{ from: number }>(el, ctx, {
    initial: { from: 0.1 },
    period: 3400,
    build: ({ from }) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(8) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      animationAppear: {
        bar: {
          channel: {
            fillOpacity: { from, to: 1 },
            // A function channel value gets the datum: taller bars start further to the right.
            x: { from: (datum: { sales: number }, g: { finalAttribute?: { x?: number } }) => (g.finalAttribute?.x ?? 0) + datum.sales * 2 },
          },
          duration: 1400,
          easing: 'cubicOut',
          oneByOne: 100,
        },
      },
    }),
    step: (_s, i) => ({ from: [0.1, 0.5, 0][i % 3] ?? 0.1 }),
    controls: (bar, set) => {
      slider(bar, 'fillOpacity from', [0, 1, 0.05], 0.1, (from) => set({ from }));
    },
  });

export default mount;
