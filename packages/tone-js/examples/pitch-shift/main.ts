// Transpose a melody without changing its speed: PitchShift on melody
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'melody',
      stages: ['PitchShift'],
      caption: 'PitchShift: the same tune at another pitch',
      create: (src: Source) => {
        const fx = new Tone.PitchShift(7).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '+7', detail: '+7 semitones: up a fifth', apply: (fx) => { fx.pitch = 7; } },
        { label: '-12', detail: '-12 semitones: down an octave', apply: (fx) => { fx.pitch = -12; } },
        { label: '+12', detail: '+12 semitones: up an octave', apply: (fx) => { fx.pitch = 12; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'pitch', -24, 24, 1, 7, (v) => { fx.pitch = v; }, (v) => `${v} semitones`);
        slider(bar, 'windowSize', 0.03, 0.3, 0.01, 0.1, (v) => { fx.windowSize = v; }, (v) => `${v} s`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
