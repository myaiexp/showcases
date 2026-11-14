// The scale recording: which of its eight notes sounds at a given second
import type { Sound } from 'pizzicato';
import { fileSound } from './load.ts';
import { noteName } from './widgets.ts';

/** Length of the `scale` recording in seconds. */
export const SCALE_SECONDS = 4;
const MIDI = [60, 62, 64, 65, 67, 69, 71, 72];

/** Name of the note playing `seconds` into the scale ("C4"), each lasts half a second. */
export function scaleNote(seconds: number): string {
  return noteName(MIDI[Math.max(0, Math.min(MIDI.length - 1, Math.floor(seconds / 0.5)))]!);
}

/** The scale as a file Sound, with a short fade so a stop or pause does not click. */
export function scaleSound(options: { loop?: boolean } = {}): Promise<Sound> {
  return fileSound('scale', { attack: 0.02, release: 0.05, volume: 0.8, ...options });
}
