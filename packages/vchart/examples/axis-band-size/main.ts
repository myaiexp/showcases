// Band size: bandSize, maxBandSize and minBandSize on a band axis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = ['A', 'B', 'C', 'D', 'E', 'F'].map((k, i) => ({ k, v: [34, 52, 41, 66, 48, 39][i] }));
const MODES = ['auto', 'bandSize', 'maxBandSize', 'minBandSize'] as const;
interface State { mode: (typeof MODES)[number]; size: number; autoRegion: boolean }

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      { orient: 'bottom', type: 'band', ...(s.mode === 'auto' ? {} : { [s.mode]: s.size }), ...(s.mode === 'bandSize' || s.mode === 'maxBandSize' ? { autoRegionSize: s.autoRegion } : {}) },
      { orient: 'left' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { mode: 'bandSize', size: 40, autoRegion: false },
    build,
    mode: 'rebuild',
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] ?? 'auto', size: s.mode === 'bandSize' ? 30 : 50 }),
    controls: (bar, live) => {
      const modeSelect = select(bar, 'option', MODES, (v) => {
        // autoRegionSize only applies together with bandSize or maxBandSize, so it is not sent in the other modes.
        region.disabled = v === 'auto' || v === 'minBandSize';
        live.set({ mode: v as State['mode'] });
      });
      modeSelect.value = 'bandSize';
      slider(bar, 'pixels', [10, 160, 5], 40, (v) => live.set({ size: v }));
      const region = select(bar, 'autoRegionSize', ['false', 'true'], (v) => live.set({ autoRegion: v === 'true' }));
    },
  });

export default mount;
