// Wobbling pitch like a singer's vibrato: Vibrato on chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });

  return stage.run(
    fxSpec(stage, {
      source: 'chord',
      stages: ['Vibrato'],
      caption: 'Vibrato: an LFO bends the pitch',
      create: (src: Source) => {
        const fx = new Tone.Vibrato(5, 0.1).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'gentle', detail: '5 Hz, depth 0.1: gentle', apply: () => undefined },
        { label: 'wide', detail: '7 Hz, depth 0.8: wide and wobbly', apply: (fx) => { fx.frequency.value = 7; fx.depth.value = 0.8; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'frequency', 0.5, 15, 0.5, 5, (v) => { fx.frequency.value = v; }, (v) => `${v} Hz`);
        slider(bar, 'depth', 0, 1, 0.01, 0.1, (v) => { fx.depth.value = v; });
        select(bar, 'type', ['sine', 'triangle', 'square', 'sawtooth'] as const, (v) => { fx.type = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
