// MonoSynth: a snapping filter envelope makes an acid bass line
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const LINE = ['C2', 'C2', 'C3', 'C2', 'D#2', 'C2', 'G2', 'C2', 'C2', 'C3', 'A#1', 'C2', 'D#2', 'G2', 'C3', 'D#3'];
const OPEN = [0.5, 2.5, 5];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const keys = keyboard(stage.visual, 'C2', 'C4');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () =>
      new Tone.MonoSynth({
        oscillator: { type: 'sawtooth' },
        filter: { Q: 6, type: 'lowpass', rolloff: -24 },
        envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.1 },
        filterEnvelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.2, baseFrequency: 120, octaves: 3 },
        volume: -6,
      }).toDestination(),

    play: (synth, time) => {
      const f = synth.filterEnvelope;
      const text = `filter opens ${f.octaves} octaves above ${f.baseFrequency} Hz\nresonance Q ${synth.filter.Q.value}`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, synth, LINE, time, { step: 0.15, hold: 0.1 });
    },

    variants: OPEN.map((octaves) => ({
      label: `opens ${octaves} octaves`,
      apply: (synth: Tone.MonoSynth) => (synth.filterEnvelope.octaves = octaves),
    })),

    controls: (synth, bar) => {
      playable(keys, synth, 0.3);
      const f = synth.filterEnvelope;
      slider(bar, 'filter octaves', 0, 7, 0.1, 3, (v) => (f.octaves = v));
      slider(bar, 'filter decay', 0.02, 1, 0.01, 0.2, (v) => (f.decay = v), (v) => `${v}s`);
      slider(bar, 'resonance Q', 0.5, 20, 0.5, 6, (v) => (synth.filter.Q.value = v));
    },
  });
};

export default mount;
