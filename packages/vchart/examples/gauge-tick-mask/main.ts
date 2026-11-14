// Gauge tickMask: the progress dial cut into ticks of a fixed angle
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  angle: number;
  offset: number;
  value: number;
}

const STEPS: State[] = [
  { angle: 4, offset: 0, value: 0.3 },
  { angle: 8, offset: 1, value: 0.55 },
  { angle: 2, offset: 0, value: 0.8 },
  { angle: 6, offset: 3, value: 0.95 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ angle, offset, value }) => ({
      type: 'gauge',
      data: [{ id: 'gauge', values: [{ type: 'Battery', value }] }],
      radiusField: 'type',
      angleField: 'value',
      outerRadius: 0.85,
      innerRadius: 0.6,
      startAngle: -225,
      endAngle: 45,
      gauge: {
        type: 'circularProgress',
        // The mask hides the dial except for ticks `angle` degrees wide, spaced by the dial's range.
        tickMask: { visible: true, angle, offsetAngle: offset, forceAlign: true },
        progress: { style: { fill: '#4FC6B4' } },
        track: { style: { fill: 'rgba(255,255,255,0.12)' } },
      },
      pointer: { visible: false },
      pin: { visible: false },
      pinBackground: { visible: false },
    }),
    controls: (bar, live) => {
      slider(bar, 'tickMask.angle', [1, 12, 1], live.state.angle, (angle) => live.set({ angle }));
      slider(bar, 'offsetAngle', [0, 6, 1], live.state.offset, (offset) => live.set({ offset }));
      slider(bar, 'value', [0.05, 1, 0.05], live.state.value, (value) => live.set({ value }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
