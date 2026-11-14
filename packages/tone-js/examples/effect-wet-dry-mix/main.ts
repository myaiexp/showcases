// Blend an effect with the clean sound: Distortion on drums
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'drums',
      stages: ['Distortion'],
      caption: 'wet: 0 is clean, 1 is all effect',
      create: (src: Source) => {
        const fx = new Tone.Distortion(0.9).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'wet 0.25', detail: 'wet 0.25: a hint of fuzz', apply: (fx) => { fx.wet.value = 0.25; } },
        { label: 'wet 0.5', detail: 'wet 0.5: half and half', apply: (fx) => { fx.wet.value = 0.5; } },
        { label: 'wet 1', detail: 'wet 1: all effect', apply: (fx) => { fx.wet.value = 1; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
