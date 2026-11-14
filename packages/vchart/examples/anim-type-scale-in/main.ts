// animationAppear.bar { type: 'scaleIn', options: { direction } }
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const DIRS = ['y', 'x', 'xy'] as const;

const mount: Mount = (el, ctx) =>
  mountReplay<{ direction: (typeof DIRS)[number] }>(el, ctx, {
    initial: { direction: 'y' },
    period: 3000,
    build: ({ direction }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(6) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: `scaleIn, direction: ${direction}`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { bar: { type: 'scaleIn', options: { direction }, duration: 1200, easing: 'cubicOut' } },
    }),
    step: (_s, i) => ({ direction: DIRS[i % 3] ?? 'y' }),
    controls: (bar, set) => {
      select(bar, 'direction', DIRS, (v) => set({ direction: v as (typeof DIRS)[number] }));
    },
  });

export default mount;
