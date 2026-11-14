// Circular progress tickMask: the ring drawn as separate ticks, like a segmented meter
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  angle: number;
  value: number;
}

const STEPS: State[] = [
  { angle: 3, value: 0.3 },
  { angle: 6, value: 0.55 },
  { angle: 10, value: 0.8 },
  { angle: 2, value: 1 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ angle, value }) => ({
      type: 'circularProgress',
      data: [{ id: 'goal', values: [{ type: 'Charge', value }] }],
      valueField: 'value',
      categoryField: 'type',
      innerRadius: 0.55,
      outerRadius: 0.75,
      tickMask: { visible: true, angle, offsetAngle: 0, forceAlign: true },
    }),
    controls: (bar, live) => {
      slider(bar, 'tickMask.angle', [1, 15, 1], live.state.angle, (angle) => live.set({ angle }));
      slider(bar, 'value', [0.05, 1, 0.05], live.state.value, (value) => live.set({ value }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
