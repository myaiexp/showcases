// detune: a few cents between two synths makes a slow beating shimmer
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'G4', 'E4'];
const CENTS: [number, string][] = [
  [0, 'in tune'],
  [8, '+8 cents'],
  [50, '+50 cents'],
  [100, '+100 cents: a semitone'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'G4');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => {
      const a = new Tone.Synth({ oscillator: { type: 'sawtooth' }, volume: -14 }).toDestination();
      const b = new Tone.Synth({ oscillator: { type: 'sawtooth' }, volume: -14 }).toDestination();
      return { a, b };
    },

    // Both synths play the same notes together; the second is detuned by some cents.
    play: ({ a, b }, time) => {
      const text = `second synth detune: ${b.detune.value} cents`;
      stage.show(time, () => (label.textContent = text));
      NOTES.forEach((note, i) => {
        const at = time + i;
        a.triggerAttackRelease(note, 0.95, at);
        b.triggerAttackRelease(note, 0.95, at);
        stage.show(at, () => keys.press(note, 0.95));
      });
    },

    variants: CENTS.map(([c, name]) => ({
      label: name,
      apply: ({ b }: { b: Tone.Synth }) => (b.detune.value = c),
    })),

    controls: ({ b }, bar) => {
      slider(bar, 'detune', -100, 100, 1, 0, (v) => (b.detune.value = v), (v) => `${v} cents`);
    },
  });
};

export default mount;
