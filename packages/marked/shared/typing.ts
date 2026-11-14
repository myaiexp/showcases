// Card typewriter: types sample Markdown a few characters at a time, in a loop
import type { Stage } from './stage.ts';

export interface Sample {
  /** Name in the full view's sample picker. */
  label?: string;
  text: string;
}

const TICK = 45;
/** Typing a sample takes about this long, however long it is. */
const TYPE_MS = 4200;
const HOLD_MS = 2600;

/**
 * Calls `show` with ever longer prefixes of each sample, holds the whole text, then moves
 * on. Rendering every prefix is the point: readers see Marked react as syntax completes.
 */
export function typeLoop(stage: Stage, samples: readonly Sample[], show: (text: string) => void): void {
  let i = 0;
  stage.play(async (wait) => {
    const text = samples[i % samples.length]!.text;
    i++;
    const step = Math.max(1, Math.ceil(text.length / (TYPE_MS / TICK)));
    for (let n = 0; n < text.length; ) {
      n = Math.min(text.length, n + step);
      // Finish a run of spaces in one go so indentation doesn't look like a stall.
      while (n < text.length && text[n] === ' ' && text[n - 1] === ' ') n++;
      show(text.slice(0, n));
      await wait(TICK);
    }
    await wait(HOLD_MS);
  });
}
