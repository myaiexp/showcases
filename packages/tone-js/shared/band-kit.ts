// A three-part test band (bass, keys, lead), each part its own synth to wire
import * as Tone from 'tone';

export const PARTS = ['bass', 'keys', 'lead'] as const;

export interface Band {
  /** In the order of PARTS. Nothing is connected yet. */
  readonly parts: readonly [Tone.Synth, Tone.Synth, Tone.Synth];
  /** Schedules `seconds` of the band from `time`; `onNote` gets the part index and note time. */
  start(time: number, seconds: number, onNote?: (part: number, time: number) => void): void;
  stop(time: number): void;
  dispose(): void;
}

const KEYS = ['C4', 'E4', 'G4', 'C5'];
const LEAD = ['E5', 'D5', 'G5', 'E5'];
const BASS = ['C2', 'C2', 'G2', 'F2'];

export function band(): Band {
  const bass = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.1 }, volume: -6 });
  const keys = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 }, volume: -10 });
  const lead = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.15 }, volume: -20 });
  return {
    parts: [bass, keys, lead],
    start(time, seconds, onNote) {
      for (let i = 0; i * 0.25 < seconds; i++) {
        const at = time + i * 0.25;
        keys.triggerAttackRelease(KEYS[i % 4]!, 0.2, at);
        onNote?.(1, at);
        if (i % 2 === 0) {
          const j = (i / 2) % 4;
          bass.triggerAttackRelease(BASS[j]!, 0.4, at);
          lead.triggerAttackRelease(LEAD[j]!, 0.4, at);
          onNote?.(0, at);
          onNote?.(2, at);
        }
      }
    },
    stop(time) {
      for (const p of [bass, keys, lead]) p.triggerRelease(time);
    },
    dispose() {
      for (const p of [bass, keys, lead]) p.dispose();
    },
  };
}
