// Legato: a monophonic synth re-attacks a held note without letting go first
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'E4'];
const STEP = 0.55;
type Mode = 'separate' | 'legato' | 'overlap';
const MODES: [Mode, string, string][] = [
  ['separate', 'separate notes', 'triggerAttackRelease for each note'],
  ['legato', 'legato', 'triggerAttack for each note, one triggerRelease at the end'],
  ['overlap', 'overlapping', 'next attack lands before the last release: the release cuts it short'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.6 });
  const keys = keyboard(stage.visual, 'C4', 'G4');
  const label = bigLabel(stage.visual);
  let mode: Mode = 'separate';

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.15 }, volume: -8 }).toDestination(),

    play: (synth, time) => {
      const text = MODES.find((m) => m[0] === mode)![2];
      stage.show(time, () => (label.textContent = text));
      NOTES.forEach((note, i) => {
        const at = time + i * STEP;
        if (mode === 'separate') synth.triggerAttackRelease(note, 0.3, at);
        else if (mode === 'overlap') synth.triggerAttackRelease(note, 0.8, at);
        else synth.triggerAttack(note, at);
        stage.show(at, () => keys.press(note, mode === 'separate' ? 0.3 : STEP));
      });
      if (mode === 'legato') synth.triggerRelease(time + NOTES.length * STEP);
    },
    stop: (synth, time) => void synth.triggerRelease(time),

    variants: MODES.map(([m, name]) => ({ label: name, apply: () => (mode = m) })),

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttack(note);
      });
      button(bar, 'triggerRelease()', () => void synth.triggerRelease());
    },
  });
};

export default mount;
