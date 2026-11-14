// circularProgress clamp: clip the arc to the axis range when the value exceeds maxValue
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface S { value: number; clamp: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { value: 130, clamp: true },
    previewMs: 1500,
    step: (_s, i) => ({ value: [60, 130, 160, 100][i % 4] as number, clamp: i % 8 < 4 }),
    build: (s, preview) =>
      ({
        type: 'circularProgress',
        data: [{ id: 'd', values: [{ type: 'Quota', value: s.value }] }],
        valueField: 'value',
        categoryField: 'type',
        maxValue: 100,
        clamp: s.clamp,
        innerRadius: 0.55,
        outerRadius: 0.8,
        progress: { style: { fill: '#fbbf24' } },
        track: { style: { fill: 'rgba(255,255,255,0.1)' } },
        indicator: { visible: true, title: { visible: true, style: { text: `${s.value}`, fontSize: preview ? 16 : 26, fill: '#e5e7eb' } } },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'value (max 100)', [0, 200, 10], live.state.value, (v) => live.set({ value: v }));
      select(bar, 'clamp', ['true', 'false'], (v) => live.set({ clamp: v === 'true' }));
    },
  });

export default mount;
