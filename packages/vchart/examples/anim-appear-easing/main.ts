// animationAppear.easing: the same entrance with different easing curves
import type { Mount } from '@/types.ts';
import { EASINGS, mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) =>
  mountReplay<{ easing: string }>(el, ctx, {
    initial: { easing: 'bounceOut' },
    period: 3200,
    build: ({ easing }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(9) }],
      xField: 'day',
      yField: 'sales',
      title: { visible: true, text: `easing: ${easing}`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { duration: 1600, easing: easing as 'linear' },
    }),
    step: (_s, i) => ({ easing: ['bounceOut', 'elasticOut', 'backOut', 'linear'][i % 4] ?? 'linear' }),
    controls: (bar, set) => {
      const sel = select(bar, 'easing', EASINGS, (easing) => set({ easing }));
      sel.value = 'bounceOut';
    },
  });

export default mount;
