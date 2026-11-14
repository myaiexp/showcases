// on('play'), on('pause'), on('stop'): lamps that light when the sound reports each event
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const EVENTS = ['play', 'pause', 'stop'] as const;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.4 });
  const title = bigText(stage.visual, 17);
  const lamps = lights(stage.visual, EVENTS);
  const log = smallText(stage.visual);
  const heard: string[] = [];
  const reset = (): void => {
    heard.length = 0;
    title.textContent = 'waiting for events';
    log.textContent = '';
  };
  reset();

  return stage.run({
    build: () => {
      const sound = new Pizzicato.Sound({
        source: 'wave',
        options: { type: 'triangle', frequency: 330, volume: 0.4, attack: 0.02, release: 0.08 },
      });
      for (const name of EVENTS) {
        // Called by Pizzicato each time the sound plays, pauses or stops.
        sound.on(name, () =>
          stage.show(() => {
            heard.push(name);
            lamps.flash(name);
            title.textContent = `on('${name}')`;
            log.textContent = heard.join(' → ');
          }),
        );
      }
      return sound;
    },
    play: (sound, at) => {
      stage.show(reset);
      at(0.2, () => sound.play());
      at(1, () => sound.pause());
      at(1.7, () => sound.play());
      at(2.6, () => sound.stop());
    },
    controls: (sound, bar) => {
      // A click is also the user gesture that lets the page make sound.
      const resume = (fn: () => void) => () => {
        void Pizzicato.context.resume();
        fn();
      };
      button(bar, 'play()', resume(() => sound.play()));
      button(bar, 'pause()', resume(() => sound.pause()));
      button(bar, 'stop()', resume(() => sound.stop()));
    },
  });
};

export default mount;
