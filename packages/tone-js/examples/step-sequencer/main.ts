// Step sequencer: Tone.Sequence walks 16 steps and plays the cells switched on in each
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { steps } from '../../shared/widgets.ts';

const NOTES = ['C5', 'A4', 'G4', 'E4', 'D4', 'C4'];
const STEPS = 16;
// A starting pattern: [row, step] pairs.
const START: [number, number][] = [
  [5, 0], [3, 2], [2, 4], [1, 6], [2, 8], [3, 10], [4, 12], [0, 14], [5, 8], [1, 15],
];

const mount: Mount = (el, ctx) => {
  // Four bars of sixteenths at 120 BPM are 2 seconds; the card renders two passes.
  const stage = toneStage(el, ctx, { seconds: 4 });
  const grid = steps(stage.visual, NOTES, STEPS);
  for (const [r, c] of START) grid.set(r, c, true);

  return stage.run({
    build: () => {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -8;
      const indexes = Array.from({ length: STEPS }, (_, i) => i);
      // One callback per sixteenth note, given the step index and its exact time.
      const seq = new Tone.Sequence(
        (time, step) => {
          const chord = NOTES.filter((_, row) => grid.on[row]![step]);
          if (chord.length) synth.triggerAttackRelease(chord, '16n', time);
          stage.show(time, () => grid.cursor(step));
        },
        indexes,
        '16n',
      ).start(0);
      return { synth, seq };
    },

    // Starting the Transport starts the sequence; it loops until stopped.
    play: (_, time) => {
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    stop: ({ synth }) => {
      synth.releaseAll();
      grid.cursor(-1);
    },

    controls: (_, bar) => {
      grid.onToggle(() => undefined);
      slider(bar, 'tempo', 60, 200, 1, 120, (bpm) => (Tone.getTransport().bpm.value = bpm), (v) => `${v} BPM`);
    },
  });
};

export default mount;
