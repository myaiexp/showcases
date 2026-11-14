// animationAppear.preset on a rose series: growAngle, growRadius and fadeIn
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { rng } from '../../shared/components-data.ts';
import { select } from '../../shared/chart.ts';

const PRESETS = ['growAngle', 'growRadius', 'fadeIn'] as const;
type Preset = (typeof PRESETS)[number];

const r = rng(21);
const rows = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month) => ({
  month,
  value: Math.round(20 + r() * 80),
}));

const mount: Mount = (el, ctx) =>
  mountReplay<{ preset: Preset }>(el, ctx, {
    initial: { preset: 'growAngle' },
    period: 3200,
    build: ({ preset }, preview) => ({
      type: 'rose',
      data: [{ id: 'rose', values: rows }],
      categoryField: 'month',
      valueField: 'value',
      seriesField: 'month',
      outerRadius: 0.85,
      legends: { visible: false },
      title: { visible: true, text: `preset: ${preset}`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { preset, duration: 1500 },
    }),
    step: (_s, i) => ({ preset: PRESETS[i % 3] ?? 'growAngle' }),
    controls: (bar, set) => {
      select(bar, 'preset', PRESETS, (v) => set({ preset: v as Preset }));
    },
  });

export default mount;
