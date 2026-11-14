// Three looping recordings put into one Group and started with a single play()
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { BAND, loadBand, tracks } from '../../shared/band.ts';
import { slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const title = bigText(stage.visual, ctx.preview ? 14 : 18);
  const lanes = await tracks(stage.visual, BAND, ctx.signal, ctx.preview ? 18 : 34);
  const note = smallText(stage.visual);
  let running = false;

  return stage.run({
    build: async () => {
      const sounds = await loadBand();
      return { sounds, group: new Pizzicato.Group(sounds) };
    },
    play: ({ group }, at) => {
      group.play();
      stage.show(() => {
        running = true;
        title.textContent = 'group.play()';
        note.textContent = `${group.sounds.length} sounds, one call`;
      });
      const end = (): void => {
        group.stop();
        stage.show(() => {
          running = false;
          lanes.head(null);
          title.textContent = 'group.stop()';
          note.textContent = 'all three end together';
        });
      };
      if (stage.preview) {
        at(2.1, () => stage.show(() => (title.textContent = 'still in step')));
        at(3.4, end);
      }
      return () => {
        end();
        lanes.head(null);
      };
    },
    frame: (t) => {
      if (running) lanes.head(t);
    },
    controls: ({ sounds }, bar) => {
      title.textContent = 'one group, three tracks';
      BAND.forEach((name, i) => slider(bar, name, 0, 1, 0.05, sounds[i]!.volume, (v) => (sounds[i]!.volume = v), (v) => v.toFixed(2)));
    },
  });
};

export default mount;
