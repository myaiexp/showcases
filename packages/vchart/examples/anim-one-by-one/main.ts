// animationAppear.oneByOne: bars enter together, in sequence, or staggered by a gap
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { slider } from '../../shared/chart.ts';

interface State {
  gap: number;
}

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { gap: 150 },
    period: 4200,
    build: ({ gap }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(12, [...'ABCDEFGHIJKLM'].slice(0, preview ? 9 : 13)) }],
      xField: 'day',
      yField: 'sales',
      title: { visible: true, text: gap === 0 ? 'oneByOne: false' : `oneByOne: ${gap}`, textStyle: { fontSize: preview ? 12 : 16 } },
      // 0 means all together; a number is the delay between consecutive bars.
      animationAppear: { duration: 500, easing: 'cubicOut', oneByOne: gap === 0 ? false : gap },
    }),
    step: (_s, i) => ({ gap: [0, 100, 250][i % 3] ?? 0 }),
    controls: (bar, set) => {
      slider(bar, 'gap (0 = false)', [0, 400, 25], 150, (gap) => set({ gap }));
    },
  });

export default mount;
