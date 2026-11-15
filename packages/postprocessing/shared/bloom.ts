// Bloom and blur examples: neon stage options and a card-side parameter wave
import type { StageOptions } from './stage.ts';

/** Stage options for examples that run on `neon()`. */
export const NEON_STAGE: StageOptions = { position: [0, 2.6, 6.2], target: [0, 1.2, 0], background: 0x040508 };

/** A smooth back-and-forth between `lo` and `hi`, once per `period` seconds. Cards use it in place of a slider. */
export function wave(t: number, lo: number, hi: number, period = 6): number {
  return lo + (hi - lo) * 0.5 * (1 - Math.cos((t / period) * Math.PI * 2));
}
