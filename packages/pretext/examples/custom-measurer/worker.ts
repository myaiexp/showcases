// Worker: defines a one-cell-per-grapheme OffscreenCanvas, then loads Pretext and wraps text to a grid
import type { PreparedTextWithSegments } from '@chenglou/pretext';

export type Request = { id: number; text: string; cols: number };
export type Reply = { id: number; lines: string[]; measureCalls: number; lastFont: string };

let measureCalls = 0;
let lastFont = '';
const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

// The README's contract: getContext() returns a new object with a writable `font` and a
// measureText(text) giving { width } in px, finite, for any text and font string.
// Here a grapheme is one terminal cell, and one cell is 1 "px".
class TerminalCanvas {
  getContext(): { font: string; measureText: (text: string) => { width: number } } {
    return {
      font: '',
      measureText(this: { font: string }, text: string): { width: number } {
        measureCalls++;
        lastFont = this.font;
        let n = 0;
        for (const _ of graphemes.segment(text)) n++;
        return { width: n };
      },
    };
  }
}

// It must exist before the first prepare(), and only inside this worker's global scope.
(globalThis as unknown as { OffscreenCanvas: unknown }).OffscreenCanvas = TerminalCanvas;

// Load Pretext only now, so nothing in it could have looked for a canvas earlier.
const { prepareWithSegments, layoutWithLines } = await import('@chenglou/pretext');

let cachedText = '';
let prepared: PreparedTextWithSegments | null = null;

self.onmessage = (e: MessageEvent<Request>): void => {
  const { id, text, cols } = e.data;
  if (prepared === null || text !== cachedText) {
    prepared = prepareWithSegments(text, '1px terminal');
    cachedText = text;
  }
  // Width is columns, line height 1: lines come back as one text row each.
  const { lines } = layoutWithLines(prepared, cols, 1);
  self.postMessage({ id, lines: lines.map(l => l.text), measureCalls, lastFont } satisfies Reply);
};
self.postMessage({ id: -1, lines: [], measureCalls, lastFont } satisfies Reply);
