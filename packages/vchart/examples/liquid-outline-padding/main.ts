// Liquid outlineMargin and outlinePadding: the gap to the chart edge and the gap inside the outline
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { registerLiquidChart } from '@visactor/vchart';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  margin: number;
  padding: number;
}

const STEPS: State[] = [
  { margin: 0, padding: 0 },
  { margin: 10, padding: 10 },
  { margin: 30, padding: 4 },
  { margin: 4, padding: 24 },
];

// The default VChart bundle leaves the liquid chart out; registering it is safe to repeat.
registerLiquidChart();

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ margin, padding }) => ({
      type: 'liquid',
      data: { id: 'level', values: [{ value: 0.65 }] },
      valueField: 'value',
      maskShape: 'circle',
      outlineMargin: margin,
      outlinePadding: padding,
    }),
    controls: (bar, live) => {
      slider(bar, 'outlineMargin', [0, 60, 1], live.state.margin, (margin) => live.set({ margin }));
      slider(bar, 'outlinePadding', [0, 40, 1], live.state.padding, (padding) => live.set({ padding }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1600,
  });

export default mount;
