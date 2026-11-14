// Wah pedal that follows how hard you play: AutoWah on riff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'riff',
      stages: ['AutoWah'],
      caption: 'AutoWah: filter follows the loudness',
      create: (src: Source) => {
        const fx = new Tone.AutoWah(50, 6, -30).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'Q 2', detail: 'Q 2: soft wah', apply: (fx) => { fx.Q.value = 2; } },
        { label: 'Q 12', detail: 'Q 12: sharp, vocal wah', apply: (fx) => { fx.Q.value = 12; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'Q', 0.5, 15, 0.1, 2, (v) => { fx.Q.value = v; });
        slider(bar, 'sensitivity', -60, 0, 1, -30, (v) => { fx.sensitivity = v; }, (v) => `${v} dB`);
        slider(bar, 'octaves', 1, 8, 0.1, 6, (v) => { fx.octaves = v; });
        slider(bar, 'baseFrequency', 30, 400, 5, 50, (v) => { fx.baseFrequency = v; }, (v) => `${v} Hz`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
