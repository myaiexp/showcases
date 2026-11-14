// Linear progress padding: the fill bar is inset from its track by topPadding and bottomPadding
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  top: number;
  bottom: number;
}

const STEPS: State[] = [
  { top: 0, bottom: 0 },
  { top: 10, bottom: 10 },
  { top: 20, bottom: 4 },
  { top: 4, bottom: 20 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ top, bottom }) => ({
      type: 'linearProgress',
      data: [{ id: 'job', values: [{ type: 'Build', value: 0.7 }] }],
      direction: 'horizontal',
      xField: 'value',
      yField: 'type',
      bandWidth: 60,
      progress: { topPadding: top, bottomPadding: bottom },
    }),
    controls: (bar, live) => {
      slider(bar, 'progress.topPadding', [0, 25, 1], live.state.top, (top) => live.set({ top }));
      slider(bar, 'progress.bottomPadding', [0, 25, 1], live.state.bottom, (bottom) => live.set({ bottom }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
