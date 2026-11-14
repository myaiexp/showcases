// Lo-fi crunch from fewer bits: BitCrusher on melody
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
      stages: ['BitCrusher'],
      caption: 'BitCrusher: fewer bits, more grit',
      create: (src: Source) => {
        const fx = new Tone.BitCrusher(4).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '8 bits', detail: '8 bits: light grit', apply: (fx) => { fx.bits.value = 8; } },
        { label: '4 bits', detail: '4 bits: obvious crunch', apply: (fx) => { fx.bits.value = 4; } },
        { label: '2 bits', detail: '2 bits: wrecked', apply: (fx) => { fx.bits.value = 2; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'bits', 1, 16, 1, 4, (v) => { fx.bits.value = v; }, (v) => `${v} bits`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
