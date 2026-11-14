// Liquid reverse and indicatorSmartInvert: water that fills from the top, and an indicator that stays readable
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { registerLiquidChart } from '@visactor/vchart';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  reverse: boolean;
  invert: boolean;
}

const STEPS: State[] = [
  { reverse: false, invert: false },
  { reverse: false, invert: true },
  { reverse: true, invert: true },
  { reverse: true, invert: false },
];

// The default VChart bundle leaves the liquid chart out; registering it is safe to repeat.
registerLiquidChart();

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ reverse, invert }) => ({
      type: 'liquid',
      data: { id: 'level', values: [{ value: 0.5 }] },
      valueField: 'value',
      maskShape: 'circle',
      reverse,
      indicatorSmartInvert: invert,
      outlineMargin: 8,
      outlinePadding: 8,
      // The 50 percent level puts the indicator text across the water line, where the colour matters.
      indicator: {
        visible: true,
        content: [{ visible: true, style: { fill: '#111', fontSize: 34, fontWeight: 'bold', text: '50%' } }],
      },
    }),
    controls: (bar, live) => {
      select(bar, 'reverse', ['false', 'true'], (v) => live.set({ reverse: v === 'true' }));
      select(bar, 'indicatorSmartInvert', ['false', 'true'], (v) => live.set({ invert: v === 'true' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
