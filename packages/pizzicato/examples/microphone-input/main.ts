// source: 'input': the microphone as a Sound, opened on the first Play
import type { Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { box } from '../../shared/box.ts';
import { closeMic, openMic } from '../../shared/mic.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip, type Strip } from '../../shared/strip.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

interface Mic {
  sound: Sound | null;
  volume: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.2, playLabel: 'Open the microphone' });
  const title = bigText(stage.visual, 16);
  const status = smallText(stage.visual);
  // Cards cannot use the microphone: they play a recorded voice through the same Sound API.
  let wave: Strip | null = null;
  if (ctx.preview) wave = await strip(box(stage.visual, 40), 'voice', stage.signal, 40);
  const idle = (): void => {
    title.textContent = ctx.preview ? 'stand-in voice' : "source: 'input'";
    status.textContent = ctx.preview ? 'cards never open the microphone' : 'Wear headphones, or it will feed back.';
  };
  idle();

  return stage.run<Mic>({
    build: async () => ({ sound: ctx.preview ? await fileSound('voice', { attack: 0.05 }) : null, volume: 0.8 }),
    play: (mic, at) => {
      if (ctx.preview) {
        mic.sound?.play();
        stage.show(() => {
          title.textContent = 'voice → speakers';
          status.textContent = 'stand-in voice: sound.play()';
        });
        at(2, () => mic.sound?.stop());
        return;
      }
      // Full view: the microphone opens now, on the first Play, and runs until Stop.
      let stopped = false;
      title.textContent = 'asking for the microphone…';
      status.textContent = 'Allow it in the browser prompt.';
      const open = (sound: Sound): void => {
        if (stopped) return closeMic(sound);
        mic.sound = sound;
        sound.volume = mic.volume;
        sound.play();
        title.textContent = 'you → speakers';
        status.textContent = 'Live. Say something.';
      };
      openMic(mic.volume, (sound, problem) => {
        if (sound) return open(sound);
        title.textContent = problem;
        status.textContent = 'Allow microphone access for this site, then press Open again.';
      });
      return () => {
        stopped = true;
        closeMic(mic.sound);
        mic.sound = null;
        idle();
      };
    },
    controls: (mic, bar) =>
      slider(bar, 'volume', 0, 1, 0.05, mic.volume, (v) => {
        mic.volume = v;
        if (mic.sound) mic.sound.volume = v;
      }),
    frame: (time) => wave?.head(time),
    dispose: (mic) => (ctx.preview ? mic.sound?.disconnect() : closeMic(mic.sound)),
  });
};

export default mount;
