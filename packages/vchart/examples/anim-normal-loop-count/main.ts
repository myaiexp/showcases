// animationNormal timeline with loop: n (or true) and startTime
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) =>
  mountReplay<{ loop: string }>(el, ctx, {
    initial: { loop: '3' },
    period: 8000,
    build: ({ loop }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(19) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: `loop: ${loop}`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { duration: 600 },
      animationNormal: {
        bar: [
          {
            startTime: 1200,
            loop: loop === 'true' ? true : Number(loop),
            oneByOne: 150,
            timeSlices: [
              { duration: 350, effects: { channel: { fillOpacity: { to: 0.2 } }, easing: 'quadOut' } },
              { duration: 350, effects: { channel: { fillOpacity: { to: 1 } }, easing: 'quadIn' } },
            ],
          },
        ],
      },
    }),
    step: (_s, i) => ({ loop: ['2', '4', 'true'][i % 3] ?? '3' }),
    controls: (bar, set) => {
      select(bar, 'loop', ['1', '2', '3', '5', 'true'], (loop) => set({ loop })).value = '3';
    },
  });

export default mount;
