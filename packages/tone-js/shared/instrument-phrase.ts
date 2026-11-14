// Helpers for instrument examples: play a note list and light the keys in time
import * as Tone from 'tone';
import type { Stage } from './stage.ts';
import type { Keyboard } from './widgets.ts';

/** Anything with a triggerAttackRelease(note, seconds, time, velocity): every pitched instrument. */
export interface Playable {
  triggerAttackRelease(note: string, duration: number, time?: number, velocity?: number): unknown;
}

export interface PhraseOptions {
  /** Seconds between notes. */
  step?: number;
  /** Seconds each note is held. */
  hold?: number;
  velocity?: number;
}

/** Plays `notes` one after another from `time`, flashing each key when it sounds. */
export function playNotes(
  stage: Stage,
  keys: Keyboard,
  inst: Playable,
  notes: readonly string[],
  time: number,
  { step = 0.25, hold = 0.2, velocity = 1 }: PhraseOptions = {},
): void {
  notes.forEach((note, i) => {
    const at = time + i * step;
    inst.triggerAttackRelease(note, hold, at, velocity);
    stage.show(at, () => keys.press(note, Math.max(0.15, hold)));
  });
}

/** Wires a keyboard's clicks to an instrument in the full view (starts audio first). */
export function playable(keys: Keyboard, inst: Playable, hold = 0.4): void {
  keys.onPress(async (note) => {
    await Tone.start();
    inst.triggerAttackRelease(note, hold);
  });
}

export const RIFF = ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'D4', 'C4'];
export const MELODY = ['E4', 'G4', 'A4', 'B4', 'D5', 'B4', 'A4', 'G4'];
