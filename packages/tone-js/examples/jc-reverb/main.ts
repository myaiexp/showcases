// Classic 1970 reverb on a melody: JCReverb on melody
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'melody',
      stages: ['JCReverb'],
      caption: 'JCReverb: a light, old-school room',
      create: (src: Source) => {
        const fx = new Tone.JCReverb(0.5).toDestination();
        fx.wet.value = 0.4;
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'roomSize 0.2', detail: 'roomSize 0.2: tight', apply: (fx) => { fx.roomSize.value = 0.2; } },
        { label: 'roomSize 0.9', detail: 'roomSize 0.9: spacious', apply: (fx) => { fx.roomSize.value = 0.9; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'roomSize', 0, 0.95, 0.01, 0.5, (v) => { fx.roomSize.value = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
