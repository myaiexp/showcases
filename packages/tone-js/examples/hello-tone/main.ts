// Hello Tone: a Synth plugged into the speakers plays middle C, then a short tune
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { keyboard } from '../../shared/widgets.ts';

const TUNE = ['C4', 'E4', 'G4', 'C5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const keys = keyboard(stage.visual, 'C4', 'C5');

  return stage.run({
    // A synth connected to the main output (your speakers).
    build: () => new Tone.Synth().toDestination(),

    // Middle C for an eighth note, then three more notes half a second apart.
    play: (synth, time) => {
      TUNE.forEach((note, i) => {
        const at = time + i * 0.5;
        synth.triggerAttackRelease(note, '8n', at);
        stage.show(at, () => keys.press(note));
      });
    },

    controls: (synth) => {
      keys.onPress(async (note) => {
        // Browsers stay silent until a click: Tone.start() unlocks audio.
        await Tone.start();
        synth.triggerAttackRelease(note, '8n');
      });
    },
  });
};

export default mount;
