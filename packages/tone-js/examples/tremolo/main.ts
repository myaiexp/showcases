// Pulsing volume: Tremolo on voice
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'voice',
      stages: ['Tremolo'],
      caption: 'Tremolo: an LFO moves the volume',
      create: (src: Source) => {
        const fx = new Tone.Tremolo(9, 0.75).toDestination().start();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '4 Hz', detail: '4 Hz, depth 0.6: a slow throb', apply: (fx) => { fx.frequency.value = 4; fx.depth.value = 0.6; } },
        { label: '12 Hz', detail: '12 Hz, depth 1: a fast flutter', apply: (fx) => { fx.frequency.value = 12; fx.depth.value = 1; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.5, 20, 0.5, 9, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'depth', 0, 1, 0.01, 0.75, (v) => { fx.depth.value = v; });
        slider(bar, 'spread', 0, 180, 5, 180, (v) => { fx.spread = v; }, (v) => `${v}°`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
