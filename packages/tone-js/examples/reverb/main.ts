// Voice in a closet and in a cathedral: two Reverbs, one picked per variant
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  let closet: Tone.Reverb | undefined;
  let route: (to: Tone.Reverb) => void = () => undefined;

  return stage.run(
    fxSpec(stage, {
      source: 'voice',
      stages: ['Reverb'],
      caption: 'Reverb: a generated room, decay 5 s',
      create: async (src: Source) => {
        const hall = new Tone.Reverb({ decay: 5, preDelay: 0.03, wet: 0.5 }).toDestination();
        const small = new Tone.Reverb({ decay: 0.4, wet: 0.5 }).toDestination();
        // The impulse response is generated asynchronously: nothing sounds until `ready` resolves.
        await Promise.all([hall.ready, small.ready]);
        src.out.connect(hall);
        closet = small;
        route = (to) => {
          src.out.disconnect();
          src.out.connect(to);
        };
        return hall;
      },
      variants: [
        DRY,
        { label: 'closet', detail: 'decay 0.4 s: a closet', apply: () => closet && route(closet) },
        { label: 'cathedral', detail: 'decay 5 s: a cathedral', apply: () => undefined },
      ],
      controls: (fx, bar) => {
        select(bar, 'decay', ['0.4 s', '2 s', '5 s', '10 s'] as const, async (v) => {
          fx.decay = parseFloat(v);
          await fx.ready;
        }, '5 s');
        slider(bar, 'wet', 0, 1, 0.01, 0.5, (v) => { fx.wet.value = v; });
      },
      cleanup: () => {
        closet?.dispose();
        closet = undefined;
      },
    }),
  );
};

export default mount;
