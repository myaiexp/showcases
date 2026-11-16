// Film and Video media made in code: a GIF encoder, a recorded clip, blob URLs
//
// The docs fetch /film/color.gif and /video/forest.mp4 from their site. Here the GIF is encoded in
// the page (palette 3-3-2, LZW) and the clip is a canvas recorded by MediaRecorder. Each mount gets
// its own blob: URL for the same bytes, because Resource shares one decoder per URL, and a Film or
// Video that two examples share would play, pause and seek together.
import { Resource } from 'leafer-ui';
import type { Stage } from './stage.ts';

type Paint = (g: CanvasRenderingContext2D, i: number, n: number) => void;

/** The 3-3-2 colour cube: index = rrrgggbb. */
const PALETTE = ((): Uint8Array => {
  const p = new Uint8Array(768);
  for (let i = 0; i < 256; i++) {
    p[i * 3] = Math.round((((i >> 5) & 7) / 7) * 255);
    p[i * 3 + 1] = Math.round((((i >> 2) & 7) / 7) * 255);
    p[i * 3 + 2] = Math.round(((i & 3) / 3) * 255);
  }
  return p;
})();

/** GIF's variable-width LZW with 8-bit symbols. */
function lzw(pixels: Uint8Array): number[] {
  const clear = 256;
  const eoi = 257;
  const out: number[] = [];
  let cur = 0;
  let bits = 0;
  const emit = (code: number, size: number): void => {
    cur |= code << bits;
    bits += size;
    while (bits >= 8) {
      out.push(cur & 255);
      cur >>= 8;
      bits -= 8;
    }
  };
  let size = 9;
  let next = eoi + 1;
  let dict = new Map<number, number>();
  emit(clear, size);
  let prefix = pixels[0]!;
  for (let i = 1; i < pixels.length; i++) {
    const k = pixels[i]!;
    const key = (prefix << 8) | k;
    const hit = dict.get(key);
    if (hit !== undefined) {
      prefix = hit;
      continue;
    }
    emit(prefix, size);
    if (next === 4096) {
      emit(clear, size);
      next = eoi + 1;
      size = 9;
      dict = new Map();
    } else {
      if (next >= 1 << size) size++;
      dict.set(key, next++);
    }
    prefix = k;
  }
  emit(prefix, size);
  emit(eoi, size);
  if (bits > 0) out.push(cur & 255);
  return out;
}

/** Encodes `frames` frames of `paint` as an endlessly looping GIF89a (`delay` in hundredths of a second). */
export function encodeGif(w: number, h: number, frames: number, delay: number, paint: Paint): Blob {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  const bytes: number[] = [];
  const u16 = (n: number): void => void bytes.push(n & 255, (n >> 8) & 255);
  bytes.push(...[...'GIF89a'].map((ch) => ch.charCodeAt(0)));
  u16(w);
  u16(h);
  bytes.push(0xf7, 0, 0, ...PALETTE);
  bytes.push(0x21, 0xff, 0x0b, ...[...'NETSCAPE2.0'].map((ch) => ch.charCodeAt(0)), 3, 1, 0, 0, 0);
  for (let f = 0; f < frames; f++) {
    g.clearRect(0, 0, w, h);
    paint(g, f, frames);
    const rgba = g.getImageData(0, 0, w, h).data;
    const idx = new Uint8Array(w * h);
    for (let i = 0; i < idx.length; i++) {
      idx[i] = ((rgba[i * 4]! >> 5) << 5) | ((rgba[i * 4 + 1]! >> 5) << 2) | (rgba[i * 4 + 2]! >> 6);
    }
    bytes.push(0x21, 0xf9, 4, 0x04, delay & 255, (delay >> 8) & 255, 0, 0);
    bytes.push(0x2c);
    u16(0);
    u16(0);
    u16(w);
    u16(h);
    bytes.push(0, 8);
    const data = lzw(idx);
    for (let i = 0; i < data.length; i += 255) {
      const part = data.slice(i, i + 255);
      bytes.push(part.length, ...part);
    }
    bytes.push(0);
  }
  bytes.push(0x3b);
  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
}

/** The spinner every Film example plays: a ring of dots handing a bright spot round. 96 x 96, 12 frames. */
export const SPINNER = { w: 96, h: 96, frames: 12, delay: 8 };
export function paintSpinner(g: CanvasRenderingContext2D, i: number, n: number): void {
  g.fillStyle = '#242455'; // lands exactly on a 3-3-2 palette entry
  g.fillRect(0, 0, 96, 96);
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 - Math.PI / 2;
    const lead = (((i - k) % n) + n) % n;
    g.fillStyle = `hsl(${Math.round(150 + (k / n) * 120)} 85% ${Math.round(75 - lead * 4.5)}%)`;
    g.beginPath();
    g.arc(48 + Math.cos(a) * 30, 48 + Math.sin(a) * 30, 12 - lead * 0.6, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#fff';
  g.font = 'bold 18px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(String(i + 1), 48, 49);
}

let gifBlob: Blob | undefined;
/** The spinner GIF (encoded once per page). */
export function spinnerBlob(): Blob {
  return (gifBlob ??= encodeGif(SPINNER.w, SPINNER.h, SPINNER.frames, SPINNER.delay, paintSpinner));
}

/** A blob: URL for `blob`; when the stage is disposed its Resource (decoder) is closed and the URL revoked. */
export function blobUrl(stage: Pick<Stage, 'onDispose'>, blob: Blob): string {
  const url = URL.createObjectURL(blob);
  // After the engines are destroyed: removing a Resource that a live element paints from would throw.
  stage.onDispose(() =>
    queueMicrotask(() => {
      Resource.remove(url);
      URL.revokeObjectURL(url);
    }),
  );
  return url;
}

/** One frame of the clip: a hill-and-sun scene with a ball crossing it. `t` runs 0 to 1. */
export function paintClip(g: CanvasRenderingContext2D, t: number, w = 192, h = 120): void {
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, `hsl(${215 - t * 40} 60% 30%)`);
  sky.addColorStop(1, `hsl(${30 + t * 10} 85% 65%)`);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#ffe28a';
  g.beginPath();
  g.arc(w * (0.15 + 0.7 * t), h * (0.55 - Math.sin(t * Math.PI) * 0.3), 14, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#2f5a3c';
  g.beginPath();
  g.moveTo(0, h);
  for (let x = 0; x <= w; x += 8) g.lineTo(x, h * 0.78 + Math.sin(x / 26 + t * 6) * 6);
  g.lineTo(w, h);
  g.fill();
  g.fillStyle = '#fff';
  g.font = 'bold 12px sans-serif';
  g.textAlign = 'left';
  g.fillText(`${(t * 2).toFixed(1)} s`, 8, 16);
}

export const CLIP_SECONDS = 2;
let clipPromise: Promise<Blob> | undefined;

/** Records the clip once per page (it takes `CLIP_SECONDS` of real time) and resolves the WebM blob. */
export function clipBlob(): Promise<Blob> {
  clipPromise ??= new Promise<Blob>((resolve, reject) => {
    const c = document.createElement('canvas');
    c.width = 192;
    c.height = 120;
    const g = c.getContext('2d')!;
    const rec = new MediaRecorder(c.captureStream(30), { mimeType: 'video/webm;codecs=vp8' });
    const parts: Blob[] = [];
    rec.ondataavailable = (e) => parts.push(e.data);
    rec.onerror = () => reject(new Error('recording failed'));
    rec.onstop = () => resolve(new Blob(parts, { type: 'video/webm' }));
    const start = performance.now();
    paintClip(g, 0);
    rec.start();
    const timer = window.setInterval(() => {
      const t = (performance.now() - start) / 1000 / CLIP_SECONDS;
      paintClip(g, Math.min(t, 1));
      if (t >= 1) {
        window.clearInterval(timer);
        rec.stop();
      }
    }, 1000 / 30);
  });
  return clipPromise;
}

/**
 * MediaRecorder's WebM has no duration in its header, so the element reports Infinity until it has
 * seeked to the end once. Call this on the Video's decoder element (`video.decoder.decoder`).
 */
export function settleDuration(el: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    if (Number.isFinite(el.duration)) return resolve();
    const done = (): void => {
      if (!Number.isFinite(el.duration)) return;
      el.removeEventListener('durationchange', done);
      el.currentTime = 0;
      resolve();
    };
    el.addEventListener('durationchange', done);
    el.currentTime = 1e9;
  });
}

/**
 * Card helper: when the clip reaches its end, rewind and play again, so a card keeps moving.
 * The end shows as `playerOptions.loop` counting up (the element's own `ended` flag is not reliable
 * for a recorded WebM: it reads false again after the player pauses at the end).
 */
export function loopClip(
  stage: Pick<Stage, 'every'>,
  v: { playerOptions?: { loop?: number | boolean }; stop(): void; play(): void },
): void {
  let seen = 0;
  stage.every(250, () => {
    const loops = Number(v.playerOptions?.loop ?? 0);
    if (loops === seen) return;
    seen = loops;
    v.stop();
    v.play();
  });
}
