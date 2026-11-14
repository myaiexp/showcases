// Gauge pointer: rect or path mark, its width and height, and innerPadding from the pivot
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

// A tapered needle drawn in a unit box around the pivot, tip at y = -1.
const NEEDLE = 'M0 -1 L0.08 0 L-0.08 0 Z';

interface State {
  kind: 'rect' | 'path';
  width: number;
  height: number;
  inner: number;
  pin: boolean;
}

const STEPS: State[] = [
  { kind: 'rect', width: 0.03, height: 0.6, inner: 0, pin: true },
  { kind: 'rect', width: 0.08, height: 0.4, inner: 0.1, pin: true },
  { kind: 'path', width: 0.5, height: 0.6, inner: 0, pin: true },
  { kind: 'path', width: 0.5, height: 0.6, inner: 0, pin: false },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    // Switching the pointer type leaves keys of the other type behind in the spec, so rebuild.
    mode: 'rebuild',
    build: ({ kind, width, height, inner, pin }) => ({
      type: 'gauge',
      data: [{ id: 'gauge', values: [{ type: 'Speed', value: 0.65 }] }],
      categoryField: 'type',
      valueField: 'value',
      outerRadius: 0.85,
      innerRadius: 0.65,
      startAngle: -210,
      endAngle: 30,
      pointer:
        kind === 'rect'
          ? { type: 'rect', width, height, innerPadding: inner * 100, style: { fill: '#e8e8ee' } }
          : { type: 'path', width, height, innerPadding: inner * 100, style: { path: NEEDLE, fill: '#e8e8ee' } },
      pin: { visible: pin },
      pinBackground: { visible: pin },
    }),
    controls: (bar, live) => {
      select(bar, 'pointer.type', ['rect', 'path'], (v) => live.set({ kind: v as State['kind'] }));
      slider(bar, 'width', [0.01, 0.6, 0.01], live.state.width, (width) => live.set({ width }));
      slider(bar, 'height', [0.2, 0.8, 0.05], live.state.height, (height) => live.set({ height }));
      slider(bar, 'innerPadding', [0, 0.5, 0.05], live.state.inner, (inner) => live.set({ inner }));
      select(bar, 'pin', ['true', 'false'], (v) => live.set({ pin: v === 'true' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
