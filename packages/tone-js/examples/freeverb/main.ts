// Drums in a small and a big room: Freeverb on drums
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'drums',
      stages: ['Freeverb'],
      caption: 'Freeverb: room size sets the tail',
      create: (src: Source) => {
        const fx = new Tone.Freeverb(0.7, 3000).toDestination();
        fx.wet.value = 0.4;
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'small room', detail: 'roomSize 0.2: a small room', apply: (fx) => { fx.roomSize.value = 0.2; } },
        { label: 'big room', detail: 'roomSize 0.95: a big hall', apply: (fx) => { fx.roomSize.value = 0.95; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'roomSize', 0, 0.98, 0.01, 0.7, (v) => { fx.roomSize.value = v; });
        slider(bar, 'dampening', 500, 10000, 100, 3000, (v) => { fx.dampening = v; }, (v) => `${v} Hz`);
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
