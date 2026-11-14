// A sound loaded from an audio file, with the callback telling when it is ready
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { recording } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';
import { smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const status = smallText(stage.visual, 'loading drums.wav…');
  const wave = await strip(stage.visual, 'drums', stage.signal, stage.preview ? 40 : 64);

  return stage.run({
    build: async () => {
      // A drum loop rendered in code, at a blob: URL: it stands in for './audio/drums.wav'.
      const path = await recording('drums');
      return new Promise<Sound>((resolve, reject) => {
        const sound = new Pizzicato.Sound({ source: 'file', options: { path } }, (error) => {
          if (error) return reject(error instanceof Error ? error : new Error('drums.wav did not load'));
          stage.show(() => (status.textContent = 'callback: drums.wav is ready'));
          resolve(sound);
        });
      });
    },
    play: (sound) => sound.play(),
    frame: (time) => wave.head(time),
  });
};

export default mount;
