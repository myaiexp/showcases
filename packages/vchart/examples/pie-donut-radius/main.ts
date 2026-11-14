// Donut chart: innerRadius and outerRadius are fractions of the layout radius
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface State {
  inner: number;
  outer: number;
}

// The preview cycles from a plain pie, through a thick ring, to a thin one.
const STEPS: State[] = [
  { inner: 0, outer: 0.85 },
  { inner: 0.35, outer: 0.85 },
  { inner: 0.65, outer: 0.85 },
  { inner: 0.65, outer: 0.5 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ inner, outer }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENTS }],
      categoryField: 'type',
      valueField: 'value',
      innerRadius: inner,
      outerRadius: outer,
      legends: { visible: !preview, orient: 'left' },
      label: { visible: !preview },
    }),
    controls: (bar, live) => {
      slider(bar, 'innerRadius', [0, 0.9, 0.05], live.state.inner, (inner) => live.set({ inner: Math.min(inner, live.state.outer - 0.05) }));
      slider(bar, 'outerRadius', [0.2, 1, 0.05], live.state.outer, (outer) => live.set({ outer: Math.max(outer, live.state.inner + 0.05) }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
