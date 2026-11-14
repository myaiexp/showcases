// Circular progress corners: cornerRadius rounds the arc and roundCap decides whether the round part sticks out
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  corner: number;
  cap: boolean;
}

const STEPS: State[] = [
  { corner: 0, cap: false },
  { corner: 20, cap: false },
  { corner: 20, cap: true },
  { corner: 40, cap: true },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[2] as State,
    build: ({ corner, cap }) => ({
      type: 'circularProgress',
      data: [{ id: 'goal', values: [{ type: 'Goal A', value: 0.7 }] }],
      valueField: 'value',
      categoryField: 'type',
      innerRadius: 0.55,
      outerRadius: 0.7,
      cornerRadius: corner,
      roundCap: cap,
    }),
    controls: (bar, live) => {
      slider(bar, 'cornerRadius', [0, 50, 1], live.state.corner, (corner) => live.set({ corner }));
      select(bar, 'roundCap', ['true', 'false'], (v) => live.set({ cap: v === 'true' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
