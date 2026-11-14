// animationAppear.bar { type: 'moveIn', options: { direction, orient, offset } }
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select, slider } from '../../shared/chart.ts';

interface State {
  direction: 'x' | 'y';
  orient: 'positive' | 'negative';
  offset: number;
}

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { direction: 'y', orient: 'positive', offset: 120 },
    period: 3000,
    build: ({ direction, orient, offset }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(14) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: `moveIn ${direction} ${orient} ${offset}px`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: {
        bar: { type: 'moveIn', options: { direction, orient, offset }, duration: 1200, easing: 'quartOut', oneByOne: 80 },
      },
    }),
    step: (_s, i) => {
      const k = i % 4;
      return { direction: k % 2 === 0 ? 'y' : 'x', orient: k < 2 ? 'positive' : 'negative' };
    },
    controls: (bar, set) => {
      select(bar, 'direction', ['y', 'x'], (v) => set({ direction: v as State['direction'] }));
      select(bar, 'orient', ['positive', 'negative'], (v) => set({ orient: v as State['orient'] }));
      slider(bar, 'offset', [0, 300, 10], 120, (offset) => set({ offset }));
    },
  });

export default mount;
