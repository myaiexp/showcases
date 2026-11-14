// animationAppear.bar type: growHeightIn, growWidthIn, growCenterIn
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const TYPES = ['growHeightIn', 'growWidthIn', 'growCenterIn'] as const;

const mount: Mount = (el, ctx) =>
  mountReplay<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'growHeightIn' },
    period: 3000,
    build: ({ type }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(30) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: type, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { bar: { type, duration: 1300, easing: 'cubicOut', oneByOne: 90 } },
    }),
    step: (_s, i) => ({ type: TYPES[i % 3] ?? 'growHeightIn' }),
    controls: (bar, set) => {
      select(bar, 'type', TYPES, (v) => set({ type: v as (typeof TYPES)[number] }));
    },
  });

export default mount;
