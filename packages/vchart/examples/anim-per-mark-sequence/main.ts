// Per-mark animationAppear on a bar + line chart, timed with delay, oneByOne and totalTime
import type { Mount } from '@/types.ts';
import { DAYS, mountReplay } from '../../shared/anim-data.ts';
import { rng } from '../../shared/components-data.ts';
import { select } from '../../shared/chart.ts';

const MODES = ['defaults', 'fadeIn', 'scaleIn'] as const;
type Mode = (typeof MODES)[number];

const r = rng(77);
const bars = DAYS.map((day) => ({ day, kind: 'bars', value: Math.round(15 + r() * 25) }));
const line = DAYS.map((day) => ({ day, kind: 'trend', value: Math.round(20 + r() * 25) }));

const mount: Mount = (el, ctx) =>
  mountReplay<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'defaults' },
    period: 6000,
    build: ({ mode }, preview) => {
      const t = mode === 'defaults' ? {} : { type: mode };
      return {
        type: 'common',
        title: { visible: true, text: `mark types: ${mode}`, textStyle: { fontSize: preview ? 12 : 16 } },
        series: [
          {
            type: 'bar',
            data: { id: 'bars', values: bars },
            xField: 'day',
            yField: 'value',
            animationAppear: { bar: { ...t, oneByOne: true, duration: 400, totalTime: 2000 } },
          },
          {
            type: 'line',
            data: { id: 'trend', values: line },
            xField: 'day',
            yField: 'value',
            animationAppear: {
              point: { ...t, delay: 2000, duration: 500 },
              line: { ...t, delay: 2500, duration: 1200, easing: 'cubicOut' },
            },
          },
        ],
        axes: [
          { orient: 'left', type: 'linear' },
          { orient: 'bottom', type: 'band' },
        ],
        legends: { visible: false },
      };
    },
    step: (_s, i) => ({ mode: MODES[i % 3] ?? 'defaults' }),
    controls: (bar, set) => {
      select(bar, 'type', MODES, (v) => set({ mode: v as Mode }));
    },
  });

export default mount;
