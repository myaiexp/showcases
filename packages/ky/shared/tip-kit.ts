// Tips chapter: a raw-body panel that colours multipart text, a stream maker
import { panel } from './panels.ts';
import type { Seen } from './server.ts';
import { pathOf } from './wire.ts';
import './tip.css';

export interface RawBodyOptions {
  /** Show the request line and content-type above the body. Default true. */
  head?: boolean;
}

/**
 * What the server read, line by line: boundary lines dim, field labels grey, values bright.
 * Cards hide the blank lines of a multipart body so it fits.
 */
export function rawBodyView(parent: HTMLElement, title = 'Server received', opts: RawBodyOptions = {}) {
  const p = panel(parent, title);
  const add = (cls: string, text: string): void => {
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = text;
    p.body.append(d);
  };
  const show = (req: Seen | null): void => {
    p.body.replaceChildren();
    if (!req) return add('ky-dim', 'nothing yet');
    if (opts.head !== false) {
      add('ky-req-line', `${req.method} ${pathOf(req.url)}`);
      add('tip-type', `content-type: ${req.headers.get('content-type') ?? '(none)'}`);
    }
    const boundary = /boundary=(.+)$/.exec(req.headers.get('content-type') ?? '')?.[1];
    for (const line of req.body.split(/\r?\n/)) {
      if (boundary && line.startsWith(`--${boundary}`)) add('tip-boundary', line);
      else if (line === '') add('tip-blank', '');
      else if (line.startsWith('Content-Disposition')) add('tip-label', line);
      else add('ky-body', line);
    }
  };
  show(null);
  return { ...p, show };
}

/**
 * A stream of `pieces` chunks, each made only when the reader asks for it. `onPiece` is
 * called as each one is handed over.
 */
export function pieceStream(pieces: number, size: number, onPiece: (n: number) => void): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= pieces) return controller.close();
      controller.enqueue(new Uint8Array(size).fill(97 + (i % 26)));
      onPiece(++i);
    },
  });
}
