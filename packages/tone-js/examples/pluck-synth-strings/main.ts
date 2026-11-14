// PluckSynth: a burst of noise looped through a delay is a plucked string
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['E3', 'B3', 'E4', 'G4', 'B4', 'E5'];
const DAMPENING: [number, string][] = [
  [900, 'dampening 900: dull'],
  [4000, 'dampening 4000'],
  [7000, 'dampening 7000: bright'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'E3', 'E5');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.PluckSynth({ resonance: 0.9, release: 1 }).toDestination(),

    play: (pluck, time) => {
      const text = `dampening ${pluck.dampening} Hz\nresonance ${pluck.resonance}`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, pluck, NOTES, time, { step: 0.5, hold: 0.4 });
    },

    variants: DAMPENING.map(([hz, name]) => ({
      label: name,
      apply: (pluck: Tone.PluckSynth) => (pluck.dampening = hz),
    })),

    controls: (pluck, bar) => {
      playable(keys, pluck, 0.8);
      slider(bar, 'dampening', 200, 7000, 100, 4000, (v) => (pluck.dampening = v), (v) => `${v} Hz`);
      slider(bar, 'resonance', 0.5, 0.99, 0.01, 0.9, (v) => (pluck.resonance = v));
      slider(bar, 'attackNoise', 0.1, 20, 0.1, 1, (v) => (pluck.attackNoise = v));
    },
  });
};

export default mount;
