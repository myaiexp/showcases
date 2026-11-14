// Swooshing phaser: Phaser on riff
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
      stages: ['Phaser'],
      caption: 'Phaser: moving notches in the spectrum',
      create: (src: Source) => {
        const fx = new Tone.Phaser({ frequency: 0.5, octaves: 4, baseFrequency: 400 }).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'slow', detail: 'slow: 0.5 Hz, 4 octaves', apply: (fx) => { fx.wet.value = 0.7; } },
        { label: 'fast', detail: 'fast: 8 Hz, 5 octaves', apply: (fx) => { fx.frequency.value = 8; fx.octaves = 5; fx.wet.value = 0.7; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.1, 15, 0.1, 0.5, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'octaves', 0.5, 6, 0.1, 4, (v) => { fx.octaves = v; });
        slider(bar, 'baseFrequency', 100, 2000, 10, 400, (v) => { fx.baseFrequency = v; }, (v) => `${v} Hz`);
        slider(bar, 'Q', 0.5, 20, 0.1, 10, (v) => { fx.Q.value = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
