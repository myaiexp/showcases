// PolySynth releaseAll: let go of every held note with a single call
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'B4', 'D5'];
const LET_GO = 2.2;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const keys = keyboard(stage.visual, 'C4', 'D5');
  const label = bigLabel(stage.visual);
  let all = true;

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.03, release: 0.7 }, volume: -8 }).toDestination(),

    play: (synth, time) => {
      NOTES.forEach((note, i) => {
        const at = time + i * 0.2;
        synth.triggerAttack(note, at);
        stage.show(at, () => keys.press(note, LET_GO - i * 0.2));
      });
      if (all) synth.releaseAll(time + LET_GO);
      // The long way round: one triggerRelease per note, a little apart.
      else NOTES.forEach((note, i) => synth.triggerRelease(note, time + LET_GO + i * 0.35));
      stage.show(time, () => (label.textContent = 'holding five notes'));
      stage.show(time + LET_GO, () => (label.textContent = all ? 'releaseAll()' : 'triggerRelease(note), one by one'));
    },
    stop: (synth, time) => void synth.releaseAll(time),

    variants: [
      { label: 'releaseAll', apply: () => (all = true) },
      { label: 'one at a time', apply: () => (all = false) },
    ],

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttack(note);
      });
      button(bar, 'releaseAll()', () => void synth.releaseAll());
    },
  });
};

export default mount;
