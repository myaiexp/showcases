// Pizzicato.volume moved over time: three unrelated sounds follow it together
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { slider } from '../../shared/controls.ts';
import { fileSound } from '../../shared/load.ts';
import type { RecordingName } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';

const NAMES: readonly RecordingName[] = ['drums', 'bass', 'melody'];
const STEPS = [1, 0.7, 0.45, 0.25, 0.1, 0.25, 0.5, 0.8, 1];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const title = bigText(stage.visual, ctx.preview ? 15 : 20);
  const master = gauge(stage.visual, 'general', '#ff8fb1');
  const own = NAMES.map((name) => gauge(stage.visual, name));
  const show = (volume: number): void => {
    title.textContent = `Pizzicato.volume = ${volume.toFixed(2)}`;
    master.set(volume, volume.toFixed(2));
  };

  return stage.run({
    build: async () => {
      // Three plain sounds: no group, each with a volume of its own.
      const sounds = await Promise.all(NAMES.map((name) => fileSound(name, { loop: true, volume: 0.6 })));
      sounds.forEach((s, i) => own[i]!.set(s.volume, s.volume.toFixed(2)));
      return sounds;
    },
    play: (sounds, at) => {
      sounds.forEach((s) => s.play());
      // A card slides the fader by itself; in the full view the slider does.
      if (stage.preview) {
        STEPS.forEach((volume, i) =>
          at(i * 0.44, () => {
            Pizzicato.volume = volume;
            stage.show(() => show(volume));
          }),
        );
      }
      return () => {
        sounds.forEach((s) => s.stop());
        Pizzicato.volume = 1;
      };
    },
    controls: (sounds, bar) => {
      show(Pizzicato.volume);
      slider(bar, 'Pizzicato.volume', 0, 1, 0.01, Pizzicato.volume, (v) => {
        Pizzicato.volume = v;
        show(v);
      });
      sounds.forEach((s, i) =>
        slider(bar, NAMES[i]!, 0, 1, 0.05, s.volume, (v) => {
          s.volume = v;
          own[i]!.set(v, v.toFixed(2));
        }),
      );
    },
  });
};

export default mount;
