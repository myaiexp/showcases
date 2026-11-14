// A recording drawn as a waveform strip, with a playhead and marked regions
import { recordingWave, type RecordingName } from './recordings.ts';

export interface Strip {
  /** Moves the playhead to `seconds` into the recording; null hides it. */
  head(seconds: number | null): void;
  /** Shades the part of the recording from `from` to `to` seconds; no arguments clears it. */
  mark(from?: number, to?: number): void;
}

/** Draws `name`'s waveform across the width of `parent`, until `signal` (the mount's) aborts. */
export async function strip(parent: HTMLElement, name: RecordingName, signal: AbortSignal, height = 56): Promise<Strip> {
  const { samples, seconds } = await recordingWave(name);
  const box = document.createElement('div');
  box.style.cssText = `position:relative;width:100%;height:${height}px;flex:0 0 auto;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;overflow:hidden`;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  const shade = document.createElement('div');
  shade.style.cssText = 'position:absolute;top:0;bottom:0;background:rgba(122,162,255,0.18);display:none';
  const head = document.createElement('div');
  head.style.cssText = 'position:absolute;top:0;bottom:0;width:2px;background:#ff8fb1;display:none';
  box.append(shade, canvas, head);
  parent.append(box);

  const draw = (): void => {
    const w = Math.max(1, box.clientWidth);
    const h = Math.max(1, box.clientHeight);
    canvas.width = w;
    canvas.height = h;
    const g = canvas.getContext('2d')!;
    g.fillStyle = '#7aa2ff';
    const per = samples.length / w;
    for (let x = 0; x < w; x++) {
      let peak = 0;
      const end = Math.min(samples.length, Math.floor((x + 1) * per));
      for (let i = Math.floor(x * per); i < end; i++) peak = Math.max(peak, Math.abs(samples[i]!));
      const bh = Math.max(1, peak * (h - 6));
      g.fillRect(x, (h - bh) / 2, 1, bh);
    }
  };
  draw();
  const ro = new ResizeObserver(draw);
  ro.observe(box);
  signal.addEventListener('abort', () => ro.disconnect(), { once: true });

  const pct = (s: number): string => `${(Math.max(0, Math.min(seconds, s)) / seconds) * 100}%`;
  return {
    head(s) {
      head.style.display = s === null ? 'none' : '';
      if (s !== null) head.style.left = pct(s);
    },
    mark(from, to) {
      shade.style.display = from === undefined ? 'none' : '';
      if (from !== undefined) {
        shade.style.left = pct(from);
        shade.style.width = `calc(${pct(to ?? seconds)} - ${pct(from)})`;
      }
    },
  };
}
