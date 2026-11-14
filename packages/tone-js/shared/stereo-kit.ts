// Stereo test sound and offline probes for routing and analysis examples
import * as Tone from 'tone';
import { renderOffline } from './render.ts';
import type { Stage } from './stage.ts';

export interface Probe {
  channels: Float32Array[];
  sampleRate: number;
}

/**
 * Card only: renders `build` on its own (scheduled from time 0) so the example can draw
 * what a node really outputs, since analysers read silence in a card. Null when aborted.
 */
export function probe(stage: Stage, seconds: number, channels: number, build: () => void | Promise<void>): Promise<Probe | null> {
  return renderOffline(build, seconds, channels, stage.signal);
}

/** RMS of a probe channel in the `win` seconds before `time`. */
export function rmsAt(p: Probe, channel: number, time: number, win = 0.06): number {
  const ch = p.channels[channel];
  if (!ch) return 0;
  const end = Math.min(ch.length, Math.floor(time * p.sampleRate));
  const start = Math.max(0, end - Math.floor(win * p.sampleRate));
  let sum = 0;
  for (let i = start; i < end; i++) sum += ch[i]! * ch[i]!;
  return end > start ? Math.sqrt(sum / (end - start)) : 0;
}

/** The value of a probe channel at `time`. */
export function valueAt(p: Probe, channel: number, time: number): number {
  const ch = p.channels[channel];
  return ch ? (ch[Math.min(ch.length - 1, Math.max(0, Math.floor(time * p.sampleRate)))] ?? 0) : 0;
}

export type Side = 'L' | 'R' | 'C';

export interface StereoSource {
  /** Two channels: left and right differ. Connect this onward. */
  readonly out: Tone.Merge;
  /** Schedules `seconds` of notes: left on even steps, right on odd, and a centre bass. */
  start(time: number, seconds: number, onNote?: (side: Side, time: number) => void): void;
  stop(time: number): void;
  dispose(): void;
}

const LEFT = ['E4', 'G4', 'B4', 'D5'];
const RIGHT = ['A4', 'C5', 'E5', 'C5'];

/**
 * A test sound with a different part in each ear: a triangle arpeggio on the left, a
 * sawtooth one on the right (alternating), and, if `centre`, a bass in both.
 */
export function stereoSource(centre = true): StereoSource {
  const out = new Tone.Merge(2);
  const env = { attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.1 };
  const left = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: env, volume: -8 }).connect(out, 0, 0);
  const right = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: env, volume: -16 }).connect(out, 0, 1);
  const bass = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { ...env, sustain: 0.8, release: 0.2 }, volume: -8 });
  bass.connect(out, 0, 0);
  bass.connect(out, 0, 1);
  return {
    out,
    start(time, seconds, onNote) {
      for (let i = 0; i * 0.25 < seconds; i++) {
        const at = time + i * 0.25;
        const j = Math.floor(i / 2) % 4;
        if (i % 2 === 0) left.triggerAttackRelease(LEFT[j]!, 0.18, at);
        else right.triggerAttackRelease(RIGHT[j]!, 0.18, at);
        onNote?.(i % 2 === 0 ? 'L' : 'R', at);
      }
      if (centre) {
        for (let b = 0; b < seconds; b++) {
          bass.triggerAttackRelease(b % 2 ? 'G2' : 'C2', 0.9, time + b);
          onNote?.('C', time + b);
        }
      }
    },
    stop(time) {
      left.triggerRelease(time);
      right.triggerRelease(time);
      bass.triggerRelease(time);
    },
    dispose() {
      left.dispose();
      right.dispose();
      bass.dispose();
      out.dispose();
    },
  };
}
