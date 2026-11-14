// AMSynth: one oscillator shakes another's volume, tuned by harmonicity
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const RATIOS = [0.5, 1, 3, 7.5];
const NOTES = ['C4', 'G4', 'E5', 'G4', 'C4'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'E5');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.AMSynth({ harmonicity: 3, modulationEnvelope: { attack: 0.01 } }).toDestination(),

    play: (synth, time) => {
      const text = `harmonicity ${synth.harmonicity.value}\nmodulator at ${synth.harmonicity.value} x the note`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, synth, NOTES, time, { step: 0.55, hold: 0.5 });
    },

    variants: RATIOS.map((h) => ({
      label: `harmonicity ${h}`,
      apply: (synth: Tone.AMSynth) => (synth.harmonicity.value = h),
    })),

    controls: (synth, bar) => {
      playable(keys, synth, 0.6);
      slider(bar, 'harmonicity', 0.25, 10, 0.25, 3, (v) => (synth.harmonicity.value = v));
    },
  });
};

export default mount;
