// Silent card renders through Tone.Offline, queued one at a time
import * as Tone from 'tone';

/**
 * Tone.Offline swaps Tone's global context for an OfflineContext while its callback runs
 * and restores the previous one afterwards. Two renders overlapping would restore each
 * other's context and leave the page on a dead offline one, so every card render goes
 * through this queue, and a live example waits for it to drain before building nodes.
 */
let tail: Promise<unknown> = Promise.resolve();

/** Cards render at this rate: half the work of 44.1 kHz, and plenty for drawing a waveform. */
export const CARD_RATE = 22050;

export interface Rendered {
  /** One Float32Array per channel. */
  channels: Float32Array[];
  sampleRate: number;
}

/**
 * Renders `seconds` of whatever `callback` builds and schedules, silently. Resolves null
 * when `signal` aborted before the render's turn came.
 */
export function renderOffline(
  callback: () => Promise<void> | void,
  seconds: number,
  channels: number,
  signal: AbortSignal,
): Promise<Rendered | null> {
  const job = tail.then(async () => {
    if (signal.aborted) return null;
    const buffer = await Tone.Offline(callback, seconds, channels, CARD_RATE);
    const out: Float32Array[] = [];
    for (let c = 0; c < channels; c++) out.push(buffer.getChannelData(Math.min(c, buffer.numberOfChannels - 1)).slice());
    buffer.dispose();
    return { channels: out, sampleRate: buffer.sampleRate };
  });
  // A failed render rejects its own caller only; the queue carries on.
  tail = job.catch(() => undefined);
  return job;
}

/** Resolves once every queued card render has finished. */
export function idle(): Promise<void> {
  return tail.then(() => undefined);
}
