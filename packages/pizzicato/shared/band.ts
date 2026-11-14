// The drums, bass and keys recordings as a band: loading them and drawing them as tracks
import type { Sound } from 'pizzicato';
import { fileSound } from './load.ts';
import type { RecordingName } from './recordings.ts';
import { strip, type Strip } from './strip.ts';

/** The recordings that make up the band; each is two seconds long. */
export const BAND: readonly RecordingName[] = ['drums', 'bass', 'keys'];

/** One looping file sound per recording, at a volume that leaves room for the others. */
export function loadBand(names: readonly RecordingName[] = BAND): Promise<Sound[]> {
  return Promise.all(names.map((name) => fileSound(name, { loop: true, volume: 0.6 })));
}

export interface Tracks {
  /** Moves every playhead to `seconds` into the loop (the recordings are two seconds long); null hides them. */
  head(seconds: number | null): void;
  /** Greys a track out (off) or brings it back. */
  dim(index: number, off: boolean): void;
}

/** One labelled waveform per recording, stacked, each with a playhead. */
export async function tracks(parent: HTMLElement, names: readonly RecordingName[], signal: AbortSignal, height: number): Promise<Tracks> {
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;gap:3px;width:100%;flex:0 0 auto;padding:0 4px;box-sizing:border-box';
  const rows: HTMLElement[] = [];
  const strips: Strip[] = [];
  for (const name of names) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:6px;transition:opacity .15s';
    const label = document.createElement('span');
    label.textContent = name;
    label.style.cssText = 'flex:0 0 38px;font:600 11px/1 ui-monospace,monospace;color:var(--fg-2)';
    const lane = document.createElement('div');
    lane.style.cssText = 'flex:1 1 0;min-width:0;display:flex';
    row.append(label, lane);
    box.append(row);
    rows.push(row);
    strips.push(await strip(lane, name, signal, height));
  }
  parent.append(box);
  return {
    head: (s) => strips.forEach((st) => st.head(s === null ? null : s % 2)),
    dim: (i, off) => {
      const row = rows[i];
      if (row) row.style.opacity = off ? '0.3' : '1';
    },
  };
}
