// The shorthand: a path string in place of the description object
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { recording, type RecordingName } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip, type Strip } from '../../shared/strip.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const NAMES = ['melody', 'bass', 'keys'] as const;

/** The shorthand form, wrapped so the example can wait for the callback. */
async function load(name: RecordingName): Promise<Sound> {
  const path = await recording(name); // stands in for './audio/melody.wav'
  return new Promise((resolve, reject) => {
    const sound = new Pizzicato.Sound(path, (error) =>
      error ? reject(error instanceof Error ? error : new Error(`${name} did not load`)) : resolve(sound),
    );
  });
}

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.6 });
  const code = bigText(stage.visual, 13);
  const note = smallText(stage.visual, 'one string, no options object');
  const holder = document.createElement('div');
  holder.style.cssText = 'width:100%;display:flex';
  stage.visual.append(holder);
  let name: RecordingName = 'melody';
  let wave: Strip = await strip(holder, name, stage.signal, ctx.preview ? 46 : 64);
  const describe = (): void => {
    code.textContent = `new Sound('${name}.wav', cb)`;
  };
  describe();

  return stage.run({
    build: async () => ({ sound: await load(name), retired: [] as Sound[] }),
    play: (g, at) => {
      g.sound.play();
      at(2.2, () => g.sound.stop());
    },
    controls: (g, bar) => {
      select(bar, 'file', NAMES, (v) => {
        // A new string means a new sound: the old one is stopped and kept to be released later.
        void load(v).then(async (next) => {
          if (stage.signal.aborted) return next.disconnect();
          const wasPlaying = g.sound.playing;
          g.sound.stop();
          g.retired.push(g.sound);
          g.sound = next;
          name = v;
          holder.replaceChildren();
          wave = await strip(holder, v, stage.signal, 64);
          describe();
          if (wasPlaying) next.play();
        });
      });
    },
    frame: (time) => wave.head(time),
  });
};

export default mount;
