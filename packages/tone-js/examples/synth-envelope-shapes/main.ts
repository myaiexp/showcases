// Synth envelope: attack, decay, sustain and release shape pluck, pad, organ
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const SHAPES = {
  pluck: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.2 },
  pad: { attack: 0.6, decay: 0.3, sustain: 0.7, release: 1 },
  organ: { attack: 0.005, decay: 0, sustain: 1, release: 0.05 },
} as const;
const NOTES = ['C4', 'E4', 'G4', 'C5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'C5');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: SHAPES.pluck, volume: -8 }).toDestination(),

    play: (synth, time) => {
      const e = synth.envelope;
      const text = `attack ${e.attack}   decay ${e.decay}\nsustain ${e.sustain}   release ${e.release}`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, synth, NOTES, time, { step: 0.7, hold: 0.55 });
    },

    variants: (Object.keys(SHAPES) as (keyof typeof SHAPES)[]).map((name) => ({
      label: name,
      apply: (synth: Tone.Synth) => synth.set({ envelope: SHAPES[name] }),
    })),

    controls: (synth, bar) => {
      playable(keys, synth, 0.5);
      const e = synth.envelope;
      slider(bar, 'attack', 0.005, 2, 0.005, 0.005, (v) => (e.attack = v), (v) => `${v}s`);
      slider(bar, 'decay', 0.01, 2, 0.01, 0.3, (v) => (e.decay = v), (v) => `${v}s`);
      slider(bar, 'sustain', 0, 1, 0.01, 0, (v) => (e.sustain = v));
      slider(bar, 'release', 0.01, 3, 0.01, 0.2, (v) => (e.release = v), (v) => `${v}s`);
    },
  });
};

export default mount;
