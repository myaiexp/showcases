// LowpassCombFilter: a burst of noise rings like a plucked string
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playNotes, type Playable } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { keyboard } from '../../shared/widgets.ts';

const NOTES = ['E2', 'G2', 'A2', 'C3', 'D3', 'C3', 'A2', 'G2'];
// Cards render at 22050 Hz, where the one-pole dampening filter goes unstable above ~7 kHz.
const DAMPENING = { bright: 6000, warm: 2000, dull: 600 } as const;

interface Pluck extends Playable {
  noise: Tone.NoiseSynth;
  comb: Tone.LowpassCombFilter;
  out: Tone.Volume;
  dispose(): void;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.8 });
  const keys = keyboard(stage.visual, 'C2', 'C3');

  return stage.run({
    build: (): Pluck => {
      const out = new Tone.Volume(-6).toDestination();
      const comb = new Tone.LowpassCombFilter({ delayTime: 0.01, resonance: 0.96, dampening: DAMPENING.warm }).connect(out);
      // A 3 ms burst of white noise: the "pluck".
      const noise = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.0005, decay: 0.003, sustain: 0, release: 0.001 }, volume: -8 }).connect(comb);
      return {
        noise,
        comb,
        out,
        // The delay is one cycle of the note: its pitch is 1 / delayTime.
        triggerAttackRelease(note, _duration, time = Tone.now()) {
          comb.delayTime.setValueAtTime(1 / Tone.Frequency(note).toFrequency(), time);
          noise.triggerAttackRelease(0.003, time);
        },
        dispose() {
          noise.dispose();
          comb.dispose();
          out.dispose();
        },
      };
    },

    play: (g, time) => playNotes(stage, keys, g, NOTES, time, { step: 0.45 }),

    variants: (Object.keys(DAMPENING) as (keyof typeof DAMPENING)[]).map((name) => ({
      label: `${name}: ${DAMPENING[name]} Hz`,
      apply: (g: Pluck) => (g.comb.dampening = DAMPENING[name]),
    })),

    controls: (g, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        g.triggerAttackRelease(note, 0);
      });
      slider(bar, 'dampening', 300, 9000, 100, DAMPENING.warm, (v) => (g.comb.dampening = v), (v) => `${v} Hz`);
      slider(bar, 'resonance', 0.8, 0.99, 0.01, 0.96, (v) => (g.comb.resonance.value = v));
    },
  });
};

export default mount;
