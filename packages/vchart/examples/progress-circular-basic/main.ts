// Circular progress: outerRadius, innerRadius and cornerRadius shape the ring that fills with the value
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  value: number;
  inner: number;
  outer: number;
  corner: number;
}

const STEPS: State[] = [
  { value: 0.25, inner: 0.5, outer: 0.6, corner: 20 },
  { value: 0.6, inner: 0.5, outer: 0.6, corner: 20 },
  { value: 0.85, inner: 0.4, outer: 0.7, corner: 0 },
  { value: 1, inner: 0.6, outer: 0.65, corner: 10 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ value, inner, outer, corner }) => ({
      type: 'circularProgress',
      data: [{ id: 'goal', values: [{ type: 'Goal A', value }] }],
      valueField: 'value',
      categoryField: 'type',
      innerRadius: inner,
      outerRadius: outer,
      cornerRadius: corner,
    }),
    controls: (bar, live) => {
      slider(bar, 'value', [0, 1, 0.05], live.state.value, (value) => live.set({ value }));
      slider(bar, 'innerRadius', [0.2, 0.85, 0.05], live.state.inner, (inner) => live.set({ inner: Math.min(inner, live.state.outer - 0.05) }));
      slider(bar, 'outerRadius', [0.3, 0.95, 0.05], live.state.outer, (outer) => live.set({ outer: Math.max(outer, live.state.inner + 0.05) }));
      slider(bar, 'cornerRadius', [0, 30, 1], live.state.corner, (corner) => live.set({ corner }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
