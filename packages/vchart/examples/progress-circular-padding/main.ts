// Circular progress padding: progress.style innerPadding and outerPadding inset the fill from its track
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  inner: number;
  outer: number;
}

const STEPS: State[] = [
  { inner: 0, outer: 0 },
  { inner: 5, outer: 5 },
  { inner: 12, outer: 0 },
  { inner: -4, outer: -4 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ inner, outer }) => ({
      type: 'circularProgress',
      data: [{ id: 'goal', values: [{ type: 'Goal A', value: 0.75 }] }],
      valueField: 'value',
      categoryField: 'type',
      innerRadius: 0.45,
      outerRadius: 0.7,
      cornerRadius: 8,
      progress: { style: { innerPadding: inner, outerPadding: outer } },
    }),
    controls: (bar, live) => {
      slider(bar, 'innerPadding', [-10, 25, 1], live.state.inner, (inner) => live.set({ inner }));
      slider(bar, 'outerPadding', [-10, 25, 1], live.state.outer, (outer) => live.set({ outer }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
