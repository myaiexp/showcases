// Rose polar axes: the angle axis bandPadding, a smooth radius grid, and inner and outer radius
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { monthRows } from '../../shared/polar-data.ts';

const ROWS = monthRows(['A'], undefined, 5);

interface State {
  padding: number;
  inner: number;
  smooth: boolean;
}

const STEPS: State[] = [
  { padding: 0.05, inner: 0, smooth: true },
  { padding: 0.3, inner: 0, smooth: false },
  { padding: 0.1, inner: 0.35, smooth: true },
  { padding: 0.4, inner: 0.35, smooth: false },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ padding, inner, smooth }, preview) => ({
      type: 'rose',
      data: [{ id: 'months', values: ROWS }],
      categoryField: 'month',
      valueField: 'value',
      seriesField: 'month',
      innerRadius: inner,
      outerRadius: 0.9,
      legends: { visible: false },
      axes: [
        { orient: 'angle', bandPadding: padding, grid: { visible: true, alignWithLabel: false }, label: { visible: true } },
        { orient: 'radius', grid: { visible: true, smooth }, label: { visible: !preview } },
      ],
    }),
    controls: (bar, live) => {
      slider(bar, 'angle bandPadding', [0, 0.6, 0.05], live.state.padding, (padding) => live.set({ padding }));
      slider(bar, 'innerRadius', [0, 0.7, 0.05], live.state.inner, (inner) => live.set({ inner }));
      select(bar, 'radius grid smooth', ['true', 'false'], (v) => live.set({ smooth: v === 'true' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
