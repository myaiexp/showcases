// Synth portamento: tied notes slide into each other instead of jumping
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'G4', 'E4', 'C5', 'A4'];
const GLIDES = [0, 0.1, 0.3];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'C5');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { sustain: 0.8, release: 0.2 }, volume: -8 }).toDestination(),

    // The notes are tied: each triggerAttack lands while the last note is still sounding.
    play: (synth, time) => {
      const text = `portamento ${synth.portamento}s`;
      stage.show(time, () => (label.textContent = text));
      NOTES.forEach((note, i) => {
        const at = time + i * 0.5;
        synth.triggerAttack(note, at);
        stage.show(at, () => keys.press(note, 0.5));
      });
      synth.triggerRelease(time + NOTES.length * 0.5);
    },
    stop: (synth, time) => void synth.triggerRelease(time),

    variants: GLIDES.map((p) => ({
      label: p === 0 ? 'no glide' : `portamento ${p}s`,
      apply: (synth: Tone.Synth) => (synth.portamento = p),
    })),

    controls: (synth, bar) => {
      slider(bar, 'portamento', 0, 0.6, 0.01, 0, (v) => (synth.portamento = v), (v) => `${v}s`);
    },
  });
};

export default mount;
