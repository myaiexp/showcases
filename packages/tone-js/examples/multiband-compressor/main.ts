// MultibandCompressor: low, mid and high compressed on their own
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Band = [threshold: number, ratio: number];
const OFF: Band = [0, 1];
const TAME: Band = [-45, 16];
const SETTINGS = {
  off: { bands: [OFF, OFF, OFF], detail: 'all three bands at ratio 1: untouched' },
  default: { bands: [[-30, 6], [-24, 3], [-24, 3]], detail: 'the default: bass -30 dB at 6:1, mids and highs -24 dB at 3:1' },
  'tame the bass': { bands: [TAME, OFF, OFF], detail: 'only the low band compressed hard: the kick shrinks, the hats do not' },
  'tame the highs': { bands: [OFF, OFF, TAME], detail: 'only the high band compressed hard: the hats shrink, the kick does not' },
} as const satisfies Record<string, { bands: readonly Band[]; detail: string }>;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];
const BANDS = ['low', 'mid', 'high'] as const;

const set = (m: Tone.MultibandCompressor, name: Name): void => {
  BANDS.forEach((band, i) => {
    const [threshold, ratio] = SETTINGS[name].bands[i]!;
    m[band].threshold.value = threshold;
    m[band].ratio.value = ratio;
  });
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['MultibandCompressor'],
    caption: 'MultibandCompressor: low, mid and high squashed apart',
    create: (src: Source) => {
      const m = new Tone.MultibandCompressor({ lowFrequency: 250, highFrequency: 2000 }).toDestination();
      src.out.connect(m);
      return m;
    },
    variants: NAMES.map((name) => ({ label: name, detail: SETTINGS[name].detail, apply: (m: Tone.MultibandCompressor) => set(m, name) })),
    controls: (m, bar) => {
      for (const band of BANDS) {
        slider(bar, `${band} threshold`, -60, 0, 1, m[band].threshold.value, (v) => (m[band].threshold.value = v), (v) => `${v} dB`);
      }
      slider(bar, 'low | mid at', 80, 800, 10, 250, (v) => (m.lowFrequency.value = v), (v) => `${v} Hz`);
      slider(bar, 'mid | high at', 1000, 6000, 100, 2000, (v) => (m.highFrequency.value = v), (v) => `${v} Hz`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
