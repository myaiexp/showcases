// Funnel maxSize, minSize and range: how values map to layer widths
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { funnelRows } from '../../shared/funnel-data.ts';

interface State {
  max: number;
  min: number;
  rangeMax: number;
}

const STEPS: State[] = [
  { max: 80, min: 0, rangeMax: 1000 },
  { max: 100, min: 30, rangeMax: 1000 },
  { max: 60, min: 10, rangeMax: 640 },
  { max: 90, min: 0, rangeMax: 400 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ max, min, rangeMax }, preview) => ({
      type: 'funnel',
      data: [{ id: 'stages', values: funnelRows() }],
      categoryField: 'name',
      valueField: 'value',
      // Sizes as percentages of the chart width. range.max is the value that gets maxSize;
      // anything above it is clamped to that width.
      maxSize: `${max}%`,
      minSize: `${min}%`,
      range: { min: 0, max: rangeMax },
      legends: { visible: false },
      label: { visible: true, style: { fontSize: preview ? 9 : 12 } },
    }),
    controls: (bar, live) => {
      slider(bar, 'maxSize %', [30, 100, 5], live.state.max, (max) => live.set({ max }));
      slider(bar, 'minSize %', [0, 50, 5], live.state.min, (min) => live.set({ min }));
      slider(bar, 'range.max', [200, 1000, 20], live.state.rangeMax, (rangeMax) => live.set({ rangeMax }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
