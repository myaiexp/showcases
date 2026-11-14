// CSV text with separators, quotes and line breaks made visible, or editable
import { GLYPHS, scanCsv, type Line, type PaintOptions } from './csv-scan.ts';

export interface ViewOptions extends PaintOptions {
  /** Extra class for physical line `i` (0-based), e.g. 'pp-dim', 'pp-bad', 'pp-hit', 'pp-strike'. */
  lineClass?: (i: number, line: Line) => string | undefined;
  /** Show at most this many lines, then "+N more lines". */
  maxLines?: number;
}

const SPECIAL = /[\t\u001e\u001f﻿]/;

/** Appends `text` to `parent`, showing tabs, separators and the BOM as glyphs. */
function appendText(parent: HTMLElement, text: string, keepChars: boolean): void {
  let run = '';
  const flush = (): void => {
    if (run) parent.append(run);
    run = '';
  };
  for (const ch of text) {
    if (!SPECIAL.test(ch)) {
      run += ch;
      continue;
    }
    flush();
    const g = document.createElement('span');
    g.className = 'pp-glyph';
    g.textContent = keepChars ? ch : GLYPHS[ch]!;
    parent.append(g);
  }
  flush();
}

function renderLines(target: HTMLElement, text: string, opts: ViewOptions, keepChars: boolean): void {
  const lines = scanCsv(text, opts);
  const shown = opts.maxLines ? lines.slice(0, opts.maxLines) : lines;
  const out: HTMLElement[] = shown.map((line, i) => {
    const row = document.createElement('div');
    row.className = 'pp-line';
    const extra = opts.lineClass?.(i, line);
    if (extra) row.classList.add(...extra.split(' '));
    for (const piece of line.pieces) {
      if (piece.kind === 'text') {
        appendText(row, piece.text, keepChars);
        continue;
      }
      const span = document.createElement('span');
      span.className = `pp-${piece.kind}`;
      appendText(span, piece.text, keepChars);
      row.append(span);
    }
    if (line.end) {
      const nl = document.createElement('span');
      nl.className = line.end.kind === 'nl' ? 'pp-nl' : 'pp-nl pp-nl-in';
      nl.dataset['g'] = GLYPHS[line.end.text] ?? '↵';
      row.append(nl);
    }
    if (!row.firstChild || (row.firstChild === row.lastChild && line.end)) row.prepend('​');
    return row;
  });
  if (opts.maxLines && lines.length > opts.maxLines) {
    const more = document.createElement('div');
    more.className = 'pp-more';
    more.textContent = `+${lines.length - opts.maxLines} more lines`;
    out.push(more);
  }
  target.replaceChildren(...out);
}

/** A read-only picture of CSV text. Call it again to repaint. */
export function csvView(text: string, opts: ViewOptions = {}): HTMLElement {
  const box = document.createElement('div');
  box.className = 'pp-csv';
  renderLines(box, text, opts, false);
  return box;
}

export interface CsvEditor {
  el: HTMLElement;
  textarea: HTMLTextAreaElement;
  readonly value: string;
  /** Replaces the text (without firing onInput). */
  set(text: string): void;
  /** Repaints with new options, e.g. the delimiter Papa detected. */
  paint(opts: ViewOptions): void;
}

/**
 * An editable CSV box: a transparent textarea over the painted text, so the reader types
 * into the same picture. `onInput` runs on every edit (and not on `set`).
 */
export function csvEditor(text: string, onInput: (text: string) => void, opts: ViewOptions = {}): CsvEditor {
  const el = document.createElement('div');
  el.className = 'pp-csv pp-editor';
  const layer = document.createElement('div');
  layer.className = 'pp-layer';
  layer.setAttribute('aria-hidden', 'true');
  const ta = document.createElement('textarea');
  ta.spellcheck = false;
  ta.setAttribute('aria-label', 'CSV text');
  ta.value = text;
  el.append(layer, ta);
  let current = opts;
  const repaint = (): void => renderLines(layer, ta.value, { ...current, maxLines: undefined }, true);
  ta.addEventListener('input', () => {
    repaint();
    onInput(ta.value);
  });
  repaint();
  return {
    el,
    textarea: ta,
    get value() {
      return ta.value;
    },
    set(t) {
      ta.value = t;
      repaint();
    },
    paint(o) {
      current = o;
      repaint();
    },
  };
}

/** Shows a string with its invisible characters as glyphs (for captions and labels). */
export function visible(text: string): string {
  return text.replace(/\r\n|[\r\n\t\u001e\u001f﻿]/g, (ch) => GLYPHS[ch] ?? ch);
}
