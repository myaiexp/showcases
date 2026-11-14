// Robot voice from a frequency shift: FrequencyShifter on voice
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'voice',
      stages: ['FrequencyShifter'],
      caption: 'FrequencyShifter: every partial moves by the same Hz',
      create: (src: Source) => {
        const fx = new Tone.FrequencyShifter(0).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '+120 Hz', detail: 'shifted up 120 Hz', apply: (fx) => { fx.frequency.value = 120; } },
        { label: '-120 Hz', detail: 'shifted down 120 Hz', apply: (fx) => { fx.frequency.value = -120; } },
        { label: '+500 Hz', detail: 'shifted up 500 Hz: unrecognisable', apply: (fx) => { fx.frequency.value = 500; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', -1000, 1000, 5, 0, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
