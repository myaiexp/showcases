// PolySynth set(): change the sound of every voice with one call
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const CHORD = ['A3', 'C4', 'E4', 'A4'];
const CHANGES = [
  { name: 'defaults', code: '', values: {} },
  { name: 'slow attack', code: 'set({ envelope: { attack: 0.3 } })', values: { envelope: { attack: 0.3 } } },
  { name: 'octave down', code: 'set({ detune: -1200 })', values: { detune: -1200 } },
  { name: 'square wave', code: "set({ oscillator: { type: 'square' } })", values: { oscillator: { type: 'square' as const } } },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'A3', 'A4');
  const label = bigLabel(stage.visual, 'synth.set(...)');
  let code = '';

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' }, volume: -8 }).toDestination(),

    play: (synth, time) => {
      const text = code ? `synth.${code}` : 'synth (nothing set)';
      stage.show(time, () => (label.textContent = text));
      [0, 1.4].forEach((offset) => {
        synth.triggerAttackRelease(CHORD, 1.2, time + offset);
        stage.show(time + offset, () => CHORD.forEach((n) => keys.press(n, 1.2)));
      });
    },

    variants: CHANGES.map((c) => ({
      label: c.name,
      apply: (synth: Tone.PolySynth) => {
        synth.set({ envelope: { attack: 0.005 }, detune: 0, oscillator: { type: 'triangle' } });
        synth.set(c.values);
        code = c.code;
      },
    })),

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttackRelease(note, 1);
      });
      select(bar, 'waveform', ['sine', 'triangle', 'square', 'sawtooth'] as const, (type) => synth.set({ oscillator: { type } }), 'triangle');
      slider(bar, 'attack', 0.005, 1, 0.005, 0.005, (v) => synth.set({ envelope: { attack: v } }), (v) => `${v}s`);
      slider(bar, 'detune', -1200, 1200, 100, 0, (v) => synth.set({ detune: v }), (v) => `${v} cents`);
    },
  });
};

export default mount;
