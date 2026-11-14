// animationAppear.line type: growPointsIn, growPointsXIn, growPointsYIn, clipIn
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { walk } from '../../shared/components-data.ts';
import { select } from '../../shared/chart.ts';

const TYPES = ['growPointsIn', 'growPointsXIn', 'growPointsYIn', 'clipIn'] as const;

const mount: Mount = (el, ctx) =>
  mountReplay<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'growPointsIn' },
    period: 3000,
    build: ({ type }, preview) => ({
      type: 'line',
      data: [{ id: 'walk', values: [...walk(12, 5, 'A'), ...walk(12, 9, 'B')] }],
      xField: 'x',
      yField: 'y',
      seriesField: 'c',
      legends: { visible: false },
      title: { visible: true, text: type, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { line: { type, duration: 1600, easing: 'cubicOut' }, point: false },
    }),
    step: (_s, i) => ({ type: TYPES[i % 4] ?? 'growPointsIn' }),
    controls: (bar, set) => {
      select(bar, 'type', TYPES, (v) => set({ type: v as (typeof TYPES)[number] }));
    },
  });

export default mount;
