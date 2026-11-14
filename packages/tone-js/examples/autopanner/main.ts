// Sound that drifts left and right: AutoPanner on chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'chord',
      stages: ['AutoPanner'],
      caption: 'AutoPanner: LFO moves the pan position',
      create: (src: Source) => {
        const fx = new Tone.AutoPanner(1).toDestination().start();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'slow 0.7 Hz', detail: 'a slow drift, 0.7 Hz', apply: (fx) => { fx.frequency.value = 0.7; } },
        { label: 'fast 4 Hz', detail: 'a fast flutter, 4 Hz', apply: (fx) => { fx.frequency.value = 4; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.1, 10, 0.1, 1, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'depth', 0, 1, 0.01, 1, (v) => { fx.depth.value = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
