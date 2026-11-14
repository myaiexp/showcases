// animationAppear.duration and .delay: the entrance animation, replayed on a loop
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { slider } from '../../shared/chart.ts';

interface State {
  duration: number;
  delay: number;
}

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { duration: 1000, delay: 0 },
    period: 4200,
    build: ({ duration, delay }) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows() }],
      xField: 'day',
      yField: 'sales',
      // The two settings this example is about: how long the entrance lasts and when it starts.
      animationAppear: { duration, delay },
    }),
    step: (_s, i) => ({ duration: [600, 1800, 2600][i % 3] ?? 1000, delay: [0, 800, 400][i % 3] ?? 0 }),
    controls: (bar, set) => {
      slider(bar, 'duration', [200, 3000, 100], 1000, (duration) => set({ duration }));
      slider(bar, 'delay', [0, 1500, 100], 0, (delay) => set({ delay }));
    },
  });

export default mount;
