// Sources, note timing and sliders shared by the effect examples
import Pizzicato, { type Sound, type Wave } from 'pizzicato';
import { slider } from './controls.ts';
import type { At } from './stage.ts';
import { hz } from './widgets.ts';

/** A wave sound with a short fade in and out, so a note starts and ends without a click. */
export function wave(type: Wave, frequency: number, volume = 0.4, options: { attack?: number; release?: number } = {}): Sound {
  return new Pizzicato.Sound({
    source: 'wave',
    options: { type, frequency, volume, attack: 0.01, release: 0.05, ...options },
  });
}

/** Plays `sound` at each start time and stops it `length` seconds later. `onHit` gets the hit's number. */
export function blips(sound: Sound, at: At, starts: readonly number[], length = 0.12, onHit?: (index: number) => void): void {
  starts.forEach((start, i) => {
    at(start, () => {
      sound.play();
      onHit?.(i);
    });
    at(start + length, () => sound.stop());
  });
}

/** Plays a tune on one wave sound: each MIDI note retunes it, plays it, and stops it `length` later. */
export function phrase(
  sound: Sound,
  at: At,
  notes: readonly number[],
  start: number,
  step: number,
  length = step * 0.8,
  onNote?: (index: number, midi: number) => void,
): void {
  notes.forEach((midi, i) => {
    at(start + i * step, () => {
      sound.play();
      // Set after play(): a retune reaches the oscillator that play() just made.
      sound.frequency = hz(midi);
      onNote?.(i, midi);
    });
    at(start + i * step + length, () => sound.stop());
  });
}

type NumberKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T] & string;

/** One slider per [property, min, max, step, unit?] row, each setting that property of `target` as it moves. */
export function tweak<T extends object>(
  bar: HTMLElement,
  target: T,
  rows: readonly (readonly [NumberKeys<T>, number, number, number, string?])[],
  after?: () => void,
): void {
  for (const [key, min, max, step, unit] of rows) {
    const live = target as Record<string, number>;
    slider(
      bar,
      key,
      min,
      max,
      step,
      live[key]!,
      (v) => {
        live[key] = v;
        after?.();
      },
      (v) => `${Number.isInteger(step) ? v : v.toFixed(step < 0.1 ? 2 : 1)}${unit ?? ''}`,
    );
  }
}
