// Limiter: a ceiling that no peak gets past, however hard the loop is pushed
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const CEILINGS = [0, -8, -20] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Limiter'],
    caption: 'Limiter: nothing louder than the threshold',
    create: (src: Source) => {
      const l = new Tone.Limiter(0).toDestination();
      // The loop is pushed 1.6 times too hard, so the peaks want to go past full scale.
      src.out.gain.value = 1.6;
      src.out.connect(l);
      return l;
    },
    variants: CEILINGS.map((db) => ({
      label: `ceiling ${db} dB`,
      detail: `threshold ${db} dB: peaks are held at ${(10 ** (db / 20)).toFixed(2)} of full scale`,
      apply: (l: Tone.Limiter) => (l.threshold.value = db),
    })),
    controls: (l, bar) => {
      slider(bar, 'threshold', -40, 0, 1, 0, (v) => (l.threshold.value = v), (v) => `${v} dB`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
