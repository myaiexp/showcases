// Transformation funnel: isTransform adds a layer between stages that shows the conversion rate
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { funnelRows } from '../../shared/funnel-data.ts';

interface State {
  transform: boolean;
  ratio: number;
}

const STEPS: State[] = [
  { transform: false, ratio: 0.5 },
  { transform: true, ratio: 0.5 },
  { transform: true, ratio: 0.25 },
  { transform: true, ratio: 0.8 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ transform, ratio }, preview) => ({
      type: 'funnel',
      data: [{ id: 'stages', values: funnelRows() }],
      categoryField: 'name',
      valueField: 'value',
      isTransform: transform,
      heightRatio: ratio,
      legends: { visible: false },
      label: { visible: true, style: { fontSize: preview ? 10 : 13 } },
      // The transform layer's label shows the rate: the lower stage divided by the upper one.
      transformLabel: { visible: true, style: { fontSize: preview ? 9 : 12 } },
    }),
    controls: (bar, live) => {
      select(bar, 'isTransform', ['true', 'false'], (v) => live.set({ transform: v === 'true' }));
      slider(bar, 'heightRatio', [0.1, 0.9, 0.05], live.state.ratio, (ratio) => live.set({ ratio }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
