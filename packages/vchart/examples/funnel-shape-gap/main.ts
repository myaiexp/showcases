// Funnel layer shape: trapezoid or rect layers, a sharp cone at the bottom, and the pixel gap between layers
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { funnelRows } from '../../shared/funnel-data.ts';

interface State {
  shape: 'trapezoid' | 'rect';
  cone: boolean;
  gap: number;
}

const STEPS: State[] = [
  { shape: 'trapezoid', cone: true, gap: 0 },
  { shape: 'trapezoid', cone: false, gap: 4 },
  { shape: 'rect', cone: true, gap: 4 },
  { shape: 'trapezoid', cone: true, gap: 14 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ shape, cone, gap }, preview) => ({
      type: 'funnel',
      data: [{ id: 'stages', values: funnelRows() }],
      categoryField: 'name',
      valueField: 'value',
      shape,
      isCone: cone,
      gap,
      legends: { visible: false },
      label: { visible: true, style: { fontSize: preview ? 9 : 12 } },
    }),
    controls: (bar, live) => {
      select(bar, 'shape', ['trapezoid', 'rect'], (v) => live.set({ shape: v as State['shape'] }));
      select(bar, 'isCone', ['true', 'false'], (v) => live.set({ cone: v === 'true' }));
      slider(bar, 'gap', [0, 30, 1], live.state.gap, (gap) => live.set({ gap }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
