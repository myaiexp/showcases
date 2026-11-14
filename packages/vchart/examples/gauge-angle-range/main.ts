// Gauge startAngle and endAngle: the same reading on a half dial, a three-quarter dial and a full ring
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  start: number;
  end: number;
}

const STEPS: State[] = [
  { start: -180, end: 0 },
  { start: -225, end: 45 },
  { start: -90, end: 270 },
  { start: -135, end: -45 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ start, end }) => ({
      type: 'gauge',
      data: [{ id: 'gauge', values: [{ type: 'Load', value: 0.7 }] }],
      categoryField: 'type',
      valueField: 'value',
      outerRadius: 0.85,
      innerRadius: 0.55,
      startAngle: start,
      endAngle: end,
    }),
    controls: (bar, live) => {
      slider(bar, 'startAngle', [-360, 0, 5], live.state.start, (start) => live.set({ start }));
      slider(bar, 'endAngle', [-90, 360, 5], live.state.end, (end) => live.set({ end }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
