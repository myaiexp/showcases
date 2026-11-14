// One wave sound, retuned with its frequency property for every note of a tune
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { box } from '../../shared/box.ts';
import { wave } from '../../shared/fx.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, keys, noteName, smallText } from '../../shared/widgets.ts';

/** "Ode to Joy" as MIDI note numbers (60 is middle C). */
const TUNE = [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62];
const STEP = 0.3;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: TUNE.length * STEP + 0.4, playLabel: 'Play the tune' });
  const title = bigText(stage.visual, 18);
  const note = smallText(stage.visual, 'one sound, many pitches');
  const piano = keys(box(stage.visual, ctx.preview ? 52 : 90), 60, 72);

  return stage.run({
    build: () => wave('triangle', hz(TUNE[0]!), 0.4, { attack: 0.01, release: 0.06 }),
    play: (sound, at) => {
      TUNE.forEach((midi, i) => {
        const frequency = Math.round(hz(midi) * 10) / 10;
        at(i * STEP, () => {
          sound.play();
          // After play(): it makes a new oscillator, and the new pitch goes onto that one.
          sound.frequency = frequency;
          stage.show(() => {
            piano.set(midi, true);
            title.textContent = `frequency = ${frequency}`;
            note.textContent = noteName(midi);
          });
        });
        at(i * STEP + STEP * 0.8, () => {
          sound.stop();
          stage.show(() => piano.set(midi, false));
        });
      });
    },
    controls: (sound, bar) => {
      slider(bar, 'volume', 0, 0.6, 0.05, sound.volume, (v) => (sound.volume = v));
    },
  });
};

export default mount;
