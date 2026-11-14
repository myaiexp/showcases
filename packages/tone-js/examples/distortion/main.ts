// Fuzz on a synth riff: Distortion on riff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'riff',
      stages: ['Distortion'],
      caption: 'Distortion: the more, the fuzzier',
      create: (src: Source) => {
        // Effect first, then send the source into it.
        const fx = new Tone.Distortion(0.8).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '0.3', detail: 'distortion 0.3: warm crunch', apply: (fx) => { fx.distortion = 0.3; } },
        { label: '0.8', detail: 'distortion 0.8: heavy fuzz', apply: (fx) => { fx.distortion = 0.8; } },
        { label: '1', detail: 'distortion 1: maximum', apply: (fx) => { fx.distortion = 1; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'distortion', 0, 1, 0.01, 0.8, (v) => { fx.distortion = v; });
        select(bar, 'oversample', ['none', '2x', '4x'] as const, (v) => { fx.oversample = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
