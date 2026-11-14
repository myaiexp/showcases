// Pieces for the Progress chapter: bars, chunk mosaic, upload body, a generated picture
import { panel } from './panels.ts';
import './prog.css';

/** '120 KB', '1.2 MB'. */
export function size(n: number): string {
  if (n < 1000) return `${n} B`;
  if (n < 1_000_000) return `${Math.round(n / 100) / 10} KB`;
  return `${(n / 1_000_000).toFixed(1)} MB`;
}

/**
 * Can this browser send a request body as a stream? Ky only measures uploads when it can, and
 * skips onUploadProgress without a word otherwise. This repeats the check in Ky's own
 * constants (Chromium yes, Firefox no) so the page can say so.
 */
export function canStreamUploads(): boolean {
  if (typeof ReadableStream !== 'function' || typeof Request !== 'function') return false;
  let duplexAccessed = false;
  let hasContentType = false;
  try {
    hasContentType = new Request('https://empty.invalid', {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    } as RequestInit).headers.has('Content-Type');
  } catch {
    return false;
  }
  return duplexAccessed && !hasContentType;
}

/**
 * An upload of `pieces` x `pieceSize` bytes. A Blob reaches the server as one single chunk, so
 * where streams work the body is a stream of separate pieces and progress moves in steps.
 * Elsewhere (Firefox cannot send streams at all) it is a plain Blob.
 */
export function uploadBody(pieces: number, pieceSize: number): BodyInit {
  if (!canStreamUploads()) return new Blob([new Uint8Array(pieces * pieceSize).fill(97)]);
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= pieces) controller.close();
      else controller.enqueue(new Uint8Array(pieceSize).fill(97));
      i++;
    },
  });
}

/** A file whose piece `i` (of `pieces`) holds the byte value `20 + i * 200 / pieces`. */
export function paintedFile(pieces: number, pieceSize: number): Uint8Array {
  const out = new Uint8Array(pieces * pieceSize);
  for (let i = 0; i < pieces; i++) out.fill(Math.round(20 + (i * 200) / pieces), i * pieceSize, (i + 1) * pieceSize);
  return out;
}

export interface Bar {
  el: HTMLElement;
  /** Fills the bar to `fraction` (0 to 1), or slides a block when the total is unknown (null). */
  set(fraction: number | null, text: string): void;
  reset(text?: string): void;
  /** Shows a wrapped orange note instead of the text line. */
  notice(text: string): void;
}

/** A titled progress bar with one line of text under it. */
export function progressBar(parent: HTMLElement, title: string): Bar {
  const p = panel(parent, title);
  const bar = document.createElement('div');
  bar.className = 'prog-bar';
  bar.dataset['tone'] = 'info';
  const fill = document.createElement('div');
  fill.className = 'prog-fill';
  bar.append(fill);
  const text = document.createElement('div');
  text.className = 'prog-text';
  p.body.append(bar, text);
  const api: Bar = {
    el: p.el,
    set(fraction, t) {
      text.className = 'prog-text';
      text.textContent = t;
      if (fraction === null) {
        bar.dataset['unknown'] = '';
        fill.style.width = '';
      } else {
        delete bar.dataset['unknown'];
        fill.style.width = `${Math.min(1, fraction) * 100}%`;
      }
    },
    reset(t = 'waiting…') {
      api.set(0, t);
    },
    notice(t) {
      delete bar.dataset['unknown'];
      fill.style.width = '0';
      text.className = 'prog-text prog-notice';
      text.textContent = t;
    },
  };
  api.reset('nothing yet');
  return api;
}

/** A row of empty slots that fill with colour as pieces of a file arrive. */
export function tiles(parent: HTMLElement, title: string) {
  const p = panel(parent, title);
  const grid = document.createElement('div');
  grid.className = 'prog-tiles';
  const text = document.createElement('div');
  text.className = 'prog-text';
  p.body.append(grid, text);
  let slots: HTMLElement[] = [];
  return {
    el: p.el,
    reset(count: number, t = 'waiting…') {
      grid.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
      slots = Array.from({ length: count }, () => {
        const s = document.createElement('div');
        s.className = 'prog-tile';
        return s;
      });
      grid.replaceChildren(...slots);
      text.textContent = t;
    },
    /** Paints slot `i` with a colour taken from the piece's first byte. */
    fill(i: number, firstByte: number, label: string) {
      const s = slots[i];
      if (!s) return;
      s.dataset['got'] = '';
      s.style.setProperty('--paint', `hsl(${Math.round(firstByte * 1.4)} 65% 55%)`);
      s.textContent = label;
    },
    say(t: string) {
      text.textContent = t;
    },
  };
}

let picture: Promise<Uint8Array> | null = null;

/** A small landscape drawn on a canvas and encoded as PNG bytes (drawn once per page). */
export function makePicture(): Promise<Uint8Array> {
  picture ??= draw().catch((err: unknown) => {
    picture = null;
    throw err;
  });
  return picture;
}

async function draw(): Promise<Uint8Array> {
  const w = 360;
  const h = 220;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#2b3a7a');
  sky.addColorStop(0.6, '#f0a070');
  sky.addColorStop(1, '#f7d58a');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#fff3c4';
  g.beginPath();
  g.arc(250, 120, 34, 0, Math.PI * 2);
  g.fill();
  const hill = (color: string, base: number, amp: number, phase: number): void => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += 6) g.lineTo(x, base + Math.sin(x / 38 + phase) * amp + Math.sin(x / 13 + phase) * 4);
    g.lineTo(w, h);
    g.fill();
  };
  hill('#5b4b8a', 150, 18, 0);
  hill('#2f3d63', 180, 14, 2);
  hill('#18223f', 205, 8, 4);
  // Grain, so the file is big enough to arrive in visible pieces.
  let seed = 7;
  const rnd = (): number => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 7000; i++) {
    g.fillStyle = `rgba(255,255,255,${(rnd() * 0.25).toFixed(2)})`;
    g.fillRect(rnd() * w, rnd() * h, 2, 2);
  }
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('The browser could not make a PNG'))), 'image/png');
  });
  return new Uint8Array(await blob.arrayBuffer());
}
