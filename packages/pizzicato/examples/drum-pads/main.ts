// A sound board: four recordings, each one a file Sound played from a pad
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, pads, smallText } from '../../shared/widgets.ts';

const NAMES = ['kick', 'snare', 'hat', 'clap'] as const;
type Name = (typeof NAMES)[number];
/** An 8-step beat, a step every quarter second: which pads hit on which step. */
const BEAT: Record<Name, number[]> = { kick: [0, 3, 4], snare: [2, 6], hat: [0, 1, 2, 3, 4, 5, 6, 7], clap: [7] };

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2, playLabel: 'Play a beat' });
  const title = bigText(stage.visual, 15);
  title.textContent = ctx.preview ? 'a beat from four files' : 'press a pad';
  const board = pads(stage.visual, NAMES, 4);
  const note = smallText(stage.visual, 'each pad is a Sound: sound.play()');

  return stage.run({
    build: async () => {
      // No attack: a drum hit should start at once. Release 0 cuts a retriggered hit cleanly.
      const sounds = await Promise.all(NAMES.map((n) => fileSound(n, { attack: 0, release: 0, volume: 0.8 })));
      return Object.fromEntries(NAMES.map((n, i) => [n, sounds[i]!])) as Record<Name, Sound>;
    },
    play: (drums, at) => {
      NAMES.forEach((n) =>
        BEAT[n].forEach((step) =>
          at(step * 0.25, () => {
            hit(drums, n);
            stage.show(() => {
              board.hit(n);
              note.textContent = `${n}.play()`;
            });
          }),
        ),
      );
    },
    controls: (drums, bar) => {
      board.onPress((n) => {
        // A click is also the user gesture that lets the page make sound.
        void Pizzicato.context.resume();
        hit(drums, n as Name);
        board.hit(n);
        note.textContent = `${n}.play()`;
      });
      slider(bar, 'volume', 0, 1, 0.05, 0.8, (v) => NAMES.forEach((n) => (drums[n].volume = v)));
    },
  });
};

/** Hits a pad: a sound already playing is stopped first, so the hit starts over. */
function hit(drums: Record<Name, Sound>, name: Name): void {
  const sound = drums[name];
  if (sound.playing) sound.stop();
  sound.play();
}

export default mount;
