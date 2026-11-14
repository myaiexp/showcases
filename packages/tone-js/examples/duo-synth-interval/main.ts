// DuoSynth: harmonicity sets how far apart its two voices sing
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const RATIOS: [number, string][] = [
  [1, 'unison'],
  [1.5, 'a fifth up'],
  [2, 'an octave up'],
  [0.5, 'an octave down'],
];
const NOTES = ['C4', 'E4', 'G4'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C3', 'C6');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.DuoSynth({ vibratoAmount: 0, volume: -8 }).toDestination(),

    play: (synth, time) => {
      const h = synth.harmonicity.value;
      const text = `voice0 sings the note\nvoice1 sings it x ${h}`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, synth, NOTES, time, { step: 0.9, hold: 0.8 });
      // Light the second voice's key too, one ratio away from each note.
      NOTES.forEach((n, i) => {
        const second = Tone.Frequency(n).transpose(Math.round(12 * Math.log2(h))).toNote();
        stage.show(time + i * 0.9, () => keys.press(second, 0.8));
      });
    },

    variants: RATIOS.map(([h, name]) => ({
      label: name,
      apply: (synth: Tone.DuoSynth) => (synth.harmonicity.value = h),
    })),

    controls: (synth, bar) => {
      playable(keys, synth, 0.8);
      slider(bar, 'harmonicity', 0.25, 4, 0.25, 1.5, (v) => (synth.harmonicity.value = v));
    },
  });
};

export default mount;
