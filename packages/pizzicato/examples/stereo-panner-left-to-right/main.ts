// A looping melody whose StereoPanner `pan` is set along a sine, left to right and back
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { stereo } from '../../shared/fx-pictures.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const SECONDS = 4;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS, channels: 2 });
  const speakers = stereo(stage.visual);
  const value = bigText(stage.visual, 16);
  const side = smallText(stage.visual);
  let auto = true;
  const show = (pan: number): void => {
    // Both speakers are at full volume in the middle; the far one fades as the sound moves away.
    speakers.set(1 - Math.max(0, pan), 1 - Math.max(0, -pan));
    value.textContent = `pan ${pan.toFixed(2)}`;
    side.textContent = pan < -0.2 ? 'mostly left' : pan > 0.2 ? 'mostly right' : 'in the middle';
  };

  return stage.run({
    build: async () => {
      const tune = await fileSound('melody', { loop: true });
      const panner = new Pizzicato.Effects.StereoPanner({ pan: 0 });
      tune.addEffect(panner);
      return { tune, panner };
    },
    play: ({ tune, panner }, at) => {
      tune.play();
      for (let t = 0; t < SECONDS; t += 0.05) {
        at(t, () => {
          if (!auto) return;
          // Starts on the left, crosses the middle at 1 s and 3 s, and ends where it began.
          panner.pan = -Math.cos((2 * Math.PI * t) / SECONDS);
          const pan = panner.pan;
          stage.show(() => show(pan));
        });
      }
    },
    controls: ({ panner }, bar) => {
      const box = checkbox(bar, 'pan by itself', true, (v) => (auto = v));
      slider(bar, 'pan', -1, 1, 0.05, 0, (v) => {
        auto = false;
        box.checked = false;
        panner.pan = v;
        show(v);
      }, (v) => v.toFixed(2));
    },
  });
};

export default mount;
