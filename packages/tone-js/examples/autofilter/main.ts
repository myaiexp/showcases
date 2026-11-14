// Filter that opens and closes by itself: AutoFilter on riff
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
      stages: ['AutoFilter'],
      caption: 'AutoFilter: LFO moves the filter cutoff',
      create: (src: Source) => {
        const fx = new Tone.AutoFilter('4n', 200, 3).toDestination().start();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '2 Hz', detail: 'sweep 2 times a second', apply: (fx) => { fx.frequency.value = 2; } },
        { label: '8 Hz', detail: 'sweep 8 times a second', apply: (fx) => { fx.frequency.value = 8; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.2, 12, 0.1, 2, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'octaves', 0.5, 6, 0.1, 3, (v) => { fx.octaves = v; });
        slider(bar, 'baseFrequency', 50, 1000, 10, 200, (v) => { fx.baseFrequency = v; }, (v) => `${v} Hz`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
