// Progressive rendering: progressiveStep and progressiveThreshold
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountProgressive, series } from '../../shared/progressive-data.ts';

interface State {
  points: number;
  step: number;
  threshold: number;
}

const mount: Mount = (el, ctx) =>
  mountProgressive<State>(el, ctx, {
    // The card draws 1500 points so it stays light; the full view starts at 5000, as in Progressive_Render.md.
    initial: ctx.preview ? { points: 1500, step: 100, threshold: 1000 } : { points: 5000, step: 100, threshold: 1000 },
    build: (s) => {
      const common = { xField: 'time', yField: 'value', progressiveStep: s.step, progressiveThreshold: s.threshold };
      return {
        type: 'common',
        data: [
          { id: 'bars', values: series(s.points, 0, 1) },
          { id: 'line', values: series(s.points, 300, 2) },
        ],
        color: ['#6690F2'],
        series: [
          { ...common, type: 'bar', dataId: 'bars' },
          { ...common, type: 'line', dataId: 'line', point: { visible: false } },
        ],
        axes: [
          { orient: 'bottom', type: 'band', label: { visible: false } },
          { orient: 'left', type: 'linear' },
        ],
        tooltip: { visible: false },
        animation: false,
      } as never;
    },
    controls(bar, state, set) {
      slider(bar, 'points', [500, 20000, 500], state.points, (points) => set({ points }));
      slider(bar, 'progressiveStep', [50, 1000, 50], state.step, (step) => set({ step }));
      slider(bar, 'progressiveThreshold', [200, 8000, 200], state.threshold, (threshold) => set({ threshold }));
    },
    // In the card the step alternates, so the slices are drawn again with a different size.
    step: (_, i) => ({ step: i % 2 ? 400 : 100, threshold: i % 2 ? 2000 : 1000 }),
  });

export default mount;
