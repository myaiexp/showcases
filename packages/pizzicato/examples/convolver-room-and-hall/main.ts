// A clap through a Convolver loaded from a small room's or a hall's impulse recording
import Pizzicato, { type Convolver } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { recording } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';

type Place = 'room' | 'hall';
const SECONDS = 3.6;
const WHERE: Record<Place, string> = { room: 'small room: 0.8 s of echo', hall: 'big hall: 3 s of echo' };

/** Makes a Convolver from an impulse recording and waits for its callback. */
async function convolver(place: Place): Promise<Convolver> {
  // A recording rendered in code, at a blob: URL: it stands in for './impulses/room.wav'.
  const impulse = await recording(place);
  return new Promise((resolve, reject) => {
    const effect = new Pizzicato.Effects.Convolver({ impulse, mix: 0.6 }, (error) =>
      error ? reject(error instanceof Error ? error : new Error(`${place} impulse did not load`)) : resolve(effect),
    );
  });
}

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'clap', ['Convolver'], 'ears');
  const height = ctx.preview ? 20 : 36;
  const strips = { room: await strip(stage.visual, 'room', stage.signal, height), hall: await strip(stage.visual, 'hall', stage.signal, height) };
  const show = (place: Place): void => {
    for (const p of ['room', 'hall'] as const) (p === place ? strips[p].mark(0) : strips[p].mark());
    picture.caption(WHERE[place]);
  };

  return stage.run({
    build: async () => {
      const clap = await fileSound('clap');
      const effects = { room: await convolver('room'), hall: await convolver('hall') };
      clap.addEffect(effects.room);
      return { clap, effects, place: 'room' as Place };
    },
    play: (g, at) => {
      stage.show(() => show(g.place));
      g.clap.play();
      at(0.5, () => g.clap.stop());
    },
    variants: [
      { label: 'room impulse', apply: () => undefined },
      {
        label: 'hall impulse',
        apply: (g) => {
          g.clap.removeEffect(g.effects.room);
          g.clap.addEffect(g.effects.hall);
          g.place = 'hall';
        },
      },
    ],
    controls: (g, bar) => {
      show(g.place);
      select(bar, 'impulse', ['room', 'hall'] as const, (place) => {
        g.clap.removeEffect(g.effects[g.place]);
        g.place = place;
        g.clap.addEffect(g.effects[place]);
        show(place);
      });
    },
  });
};

export default mount;
