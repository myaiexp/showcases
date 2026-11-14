// Compressor: threshold and ratio flatten a drum loop, slow attack keeps punch
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, type FxVariant, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Setting {
  threshold: number;
  ratio: number;
  attack: number;
  release: number;
}
const apply = (c: Tone.Compressor, s: Setting): void => {
  c.threshold.value = s.threshold;
  c.ratio.value = s.ratio;
  c.attack.value = s.attack;
  c.release.value = s.release;
};
const variant = (label: string, detail: string, s: Setting): FxVariant<Tone.Compressor> => ({ label, detail, apply: (c) => apply(c, s) });

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Compressor'],
    caption: 'Compressor: loud parts above the threshold are turned down',
    create: (src: Source) => {
      const c = new Tone.Compressor({ threshold: -24, ratio: 6, attack: 0.03, release: 0.15, knee: 6 }).toDestination();
      src.out.connect(c);
      return c;
    },
    variants: [
      variant('off', 'ratio 1: nothing is turned down', { threshold: 0, ratio: 1, attack: 0.003, release: 0.1 }),
      variant('flattened', 'threshold -36 dB, ratio 12, fast attack: every hit squashed', { threshold: -36, ratio: 12, attack: 0.003, release: 0.1 }),
      variant('punchy', 'threshold -24 dB, ratio 6, slow attack: the hit gets through, the tail is held', { threshold: -24, ratio: 6, attack: 0.03, release: 0.15 }),
    ],
    controls: (c, bar) => {
      slider(bar, 'threshold', -60, 0, 1, -24, (v) => (c.threshold.value = v), (v) => `${v} dB`);
      slider(bar, 'ratio', 1, 20, 0.5, 6, (v) => (c.ratio.value = v), (v) => `${v}:1`);
      slider(bar, 'attack', 0, 0.2, 0.005, 0.03, (v) => (c.attack.value = v), (v) => `${v} s`);
      slider(bar, 'release', 0.01, 1, 0.01, 0.15, (v) => (c.release.value = v), (v) => `${v} s`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
