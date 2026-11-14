// PolySynth: hand it an array of notes and it plays them together as a chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const CHORDS = [
  ['C4', 'E4', 'G4', 'B4'],
  ['C4', 'E4', 'G4', 'A4'],
  ['C4', 'F4', 'A4', 'C5'],
  ['D4', 'G4', 'B4', 'D5'],
];
const SIZES: [number, string][] = [
  [1, 'one note'],
  [3, 'three notes'],
  [4, 'four notes'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.6 });
  const keys = keyboard(stage.visual, 'C4', 'D5');
  const label = bigLabel(stage.visual);
  let size = 4;

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.02, decay: 0.2, sustain: 0.4, release: 0.8 } }).toDestination(),

    play: (synth, time) => {
      CHORDS.forEach((full, i) => {
        const chord = full.slice(0, size);
        const at = time + i * 0.9;
        synth.triggerAttackRelease(chord, 0.8, at);
        stage.show(at, () => {
          label.textContent = chord.join('  ');
          chord.forEach((n) => keys.press(n, 0.8));
        });
      });
    },

    variants: SIZES.map(([n, name]) => ({
      label: name,
      apply: () => (size = n),
    })),

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttackRelease(note, 0.8);
      });
      slider(bar, 'release', 0.05, 3, 0.05, 0.8, (v) => synth.set({ envelope: { release: v } }), (v) => `${v}s`);
    },
  });
};

export default mount;
