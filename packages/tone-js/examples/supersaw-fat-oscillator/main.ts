// Supersaw: a fat sawtooth stacks detuned copies into a huge chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const CHORDS = [
  ['A3', 'C4', 'E4'],
  ['F3', 'A3', 'C4'],
  ['G3', 'B3', 'D4'],
];
const SETTINGS: [number, number, string][] = [
  [1, 0, 'one saw'],
  [3, 20, '3 saws, spread 20'],
  [7, 40, '7 saws, spread 40'],
  [7, 100, '7 saws, spread 100'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'F3', 'D4');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () =>
      new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 3, spread: 20 },
        envelope: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.5 },
        volume: -14,
      }).toDestination(),

    play: (synth, time) => {
      const { count, spread } = synth.get().oscillator as { count: number; spread: number };
      const text = `count ${count}   spread ${spread} cents`;
      stage.show(time, () => (label.textContent = text));
      CHORDS.forEach((chord, i) => {
        const at = time + i;
        synth.triggerAttackRelease(chord, 0.9, at);
        stage.show(at, () => chord.forEach((n) => keys.press(n, 0.9)));
      });
    },

    variants: SETTINGS.map(([count, spread, name]) => ({
      label: name,
      apply: (synth: Tone.PolySynth) => synth.set({ oscillator: { count, spread } }),
    })),

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttackRelease(note, 0.9);
      });
      slider(bar, 'count', 1, 10, 1, 3, (v) => synth.set({ oscillator: { count: v } }));
      slider(bar, 'spread', 0, 200, 1, 20, (v) => synth.set({ oscillator: { spread: v } }), (v) => `${v} cents`);
    },
  });
};

export default mount;
