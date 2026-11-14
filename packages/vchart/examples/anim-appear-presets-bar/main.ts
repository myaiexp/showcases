// animationAppear.preset on a bar series: grow, fadeIn and scaleIn
import type { Mount } from '@/types.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const PRESETS = ['grow', 'fadeIn', 'scaleIn'] as const;

const mount: Mount = (el, ctx) =>
  mountReplay<{ preset: (typeof PRESETS)[number] }>(el, ctx, {
    initial: { preset: 'grow' },
    period: 3000,
    build: ({ preset }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(3) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: `preset: ${preset}`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { preset, duration: 1400 },
    }),
    step: (_s, i) => ({ preset: PRESETS[i % 3] ?? 'grow' }),
    controls: (bar, set) => {
      select(bar, 'preset', PRESETS, (v) => set({ preset: v as (typeof PRESETS)[number] }));
    },
  });

export default mount;
