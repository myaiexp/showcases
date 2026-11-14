// The loop file option: the playhead wraps round the recording instead of stopping
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { recording, recordingWave } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 6 });
  const title = bigText(stage.visual, 16);
  const note = smallText(stage.visual);
  const wave = await strip(stage.visual, 'drums', stage.signal, ctx.preview ? 44 : 64);
  const { seconds: length } = await recordingWave('drums');
  // What the playhead does: wrap round (loop) or stop at the end. Set by show(), so a card replays it.
  let looping = true;
  const describe = (loop: boolean): void => {
    looping = loop;
    title.textContent = `loop: ${loop}`;
    note.textContent = loop ? 'at the end it starts again' : 'at the end it stops';
  };
  describe(true);

  return stage.run({
    build: async () => {
      const path = await recording('drums');
      return new Promise<Sound>((resolve, reject) => {
        const sound = new Pizzicato.Sound({ source: 'file', options: { path, loop: true, attack: 0 } }, (error) =>
          error ? reject(error instanceof Error ? error : new Error('drums.wav did not load')) : resolve(sound),
        );
      });
    },
    play: (drums, at) => {
      const loop = drums.loop;
      stage.show(() => describe(loop));
      drums.play();
      at(5.6, () => drums.stop());
    },
    variants: [
      { label: 'loop: true', apply: (d) => (d.loop = true) },
      { label: 'loop: false', apply: (d) => (d.loop = false) },
    ],
    controls: (drums, bar) => {
      checkbox(bar, 'loop (applies on the next play)', drums.loop, (v) => {
        drums.loop = v;
        describe(v);
      });
    },
    frame: (time) => wave.head(looping ? time % length : time < length ? time : null),
  });
};

export default mount;
