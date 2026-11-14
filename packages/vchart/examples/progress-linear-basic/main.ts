// Linear progress bar: cornerRadius and bandWidth shape the bar while the value climbs
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  value: number;
  corner: number;
  band: number;
}

const STEPS: State[] = [
  { value: 0.2, corner: 20, band: 30 },
  { value: 0.55, corner: 20, band: 30 },
  { value: 0.8, corner: 4, band: 50 },
  { value: 1, corner: 0, band: 20 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ value, corner, band }) => ({
      type: 'linearProgress',
      data: [{ id: 'job', values: [{ type: 'Upload', value }] }],
      direction: 'horizontal',
      xField: 'value',
      yField: 'type',
      cornerRadius: corner,
      bandWidth: band,
    }),
    controls: (bar, live) => {
      slider(bar, 'value', [0, 1, 0.05], live.state.value, (value) => live.set({ value }));
      slider(bar, 'cornerRadius', [0, 30, 1], live.state.corner, (corner) => live.set({ corner }));
      slider(bar, 'bandWidth', [10, 80, 1], live.state.band, (band) => live.set({ band }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
