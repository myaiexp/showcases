// Liquid quick start: valueField sets the water level, the indicator card reads it out
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { registerLiquidChart } from '@visactor/vchart';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  value: number;
}

const LEVELS = [0.8, 0.35, 0.6, 0.15, 0.95];

// The default VChart bundle leaves the liquid chart out; registering it is safe to repeat.
registerLiquidChart();

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { value: 0.8 },
    build: ({ value }) => ({
      type: 'liquid',
      data: { id: 'level', values: [{ value }] },
      valueField: 'value',
      maskShape: 'drop',
      outlineMargin: 10,
      outlinePadding: 10,
      indicatorSmartInvert: true,
      indicator: {
        visible: true,
        title: { visible: true, style: { text: 'Progress' } },
        content: [{ visible: true, style: { fill: 'black', text: `${Math.round(value * 100)}%` } }],
      },
    }),
    controls: (bar, live) => {
      slider(bar, 'value', [0, 1, 0.01], live.state.value, (value) => live.set({ value }));
    },
    step: (_s, i) => ({ value: LEVELS[i % LEVELS.length] as number }),
    previewMs: 2200,
  });

export default mount;
