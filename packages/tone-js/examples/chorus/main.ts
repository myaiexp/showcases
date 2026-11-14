// One sound that becomes several: Chorus on riff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'riff',
      stages: ['Chorus'],
      caption: 'Chorus: delayed, wobbling copies',
      create: (src: Source) => {
        const fx = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'chorus', detail: 'chorus: 4 Hz, 2.5 ms, depth 0.5', apply: () => undefined },
        { label: 'flanger', detail: 'flanger: 0.3 Hz, 1 ms, feedback 0.6', apply: (fx) => { fx.frequency.value = 0.3; fx.delayTime = 1; fx.feedback.value = 0.6; fx.wet.value = 0.7; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.1, 12, 0.1, 4, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'delayTime', 0.5, 20, 0.5, 2.5, (v) => { fx.delayTime = v; }, (v) => `${v} ms`);
        slider(bar, 'depth', 0, 1, 0.01, 0.5, (v) => { fx.depth = v; });
        slider(bar, 'feedback', 0, 0.9, 0.01, 0, (v) => { fx.feedback.value = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
