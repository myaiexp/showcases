// A Group paused, resumed and stopped, with lamps for its events and a moving playhead
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { loadBand, tracks } from '../../shared/band.ts';
import { button } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const EVENTS = ['play', 'pause', 'stop'] as const;
const PAIR = ['drums', 'bass'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4.4 });
  const lamps = lights(stage.visual, EVENTS);
  const lanes = await tracks(stage.visual, PAIR, ctx.signal, ctx.preview ? 20 : 34);
  const title = bigText(stage.visual, ctx.preview ? 13 : 16);
  const note = smallText(stage.visual);
  // Where the tracks are, as the playhead shows it: advanced every frame while running.
  const place = { at: 0, running: false, last: 0 };
  const said: Record<(typeof EVENTS)[number], [string, string]> = {
    play: ['play event', 'every track runs'],
    pause: ['pause event', 'every track holds its place'],
    stop: ['stop event', 'the place is forgotten'],
  };
  const lamp = (name: (typeof EVENTS)[number]): void => {
    EVENTS.forEach((n) => lamps.set(n, n === name));
    [title.textContent, note.textContent] = said[name];
    place.running = name === 'play';
    if (name === 'stop') place.at = 0;
  };

  return stage.run({
    build: async () => {
      const group = new Pizzicato.Group(await loadBand(PAIR));
      for (const name of EVENTS) group.on(name, () => stage.show(() => lamp(name)));
      return group;
    },
    play: (group, at) => {
      stage.show(() => {
        place.at = 0;
        lanes.head(0);
      });
      group.play();
      if (stage.preview) {
        at(1.0, () => group.pause());
        at(2.2, () => group.play());
        at(3.2, () => group.stop());
        at(3.7, () => group.play());
        at(4.3, () => group.stop());
      }
      return () => group.stop();
    },
    frame: (t) => {
      if (place.running && t > place.last) place.at = (place.at + t - place.last) % 2;
      place.last = t;
      lanes.head(place.at);
    },
    controls: (group, bar) => {
      title.textContent = 'press Play, then pause it';
      button(bar, 'group.pause()', () => group.pause());
      button(bar, 'group.play()', () => {
        void Pizzicato.context.resume();
        group.play();
      });
      button(bar, 'group.stop()', () => group.stop());
    },
  });
};

export default mount;
