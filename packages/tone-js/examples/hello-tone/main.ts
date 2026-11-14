// Hello Tone: a Synth plugged into the speakers plays middle C for an eighth note
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { keyboard } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 1 });
  const keys = keyboard(stage.visual, 'C4', 'C5');

  return stage.run({
    // A synth connected to the main output (your speakers).
    build: () => new Tone.Synth().toDestination(),

    // Middle C for the length of an eighth note.
    play: (synth, time) => {
      synth.triggerAttackRelease('C4', '8n', time);
      stage.show(time, () => keys.press('C4'));
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
