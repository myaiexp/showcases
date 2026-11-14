// Splits CSV text into pieces (separators, quotes, line breaks) to colour them

/**
 * How the text is painted. This is a picture of the text for readers, not a parser: the
 * examples' results always come from Papa Parse itself.
 */
export interface PaintOptions {
  /** Separator(s) to colour; '' colours none. Default ','. */
  delimiter?: string | readonly string[];
  /** Default '"'. */
  quoteChar?: string;
  /** Default: the quote character (a doubled quote). */
  escapeChar?: string;
  /** A line starting with this is painted as a comment. */
  comments?: string;
}

export type PieceKind =
  | 'text'
  | 'sep' // a separator between fields
  | 'quote' // a quote that opens or closes a field
  | 'esc' // an escaped quote inside a quoted field
  | 'nl' // a line break that ends a row
  | 'nl-in' // a line break inside a quoted field
  | 'comment';

export interface Piece {
  kind: PieceKind;
  text: string;
}

/** One physical line of the text and the pieces on it; `end` is its line break, if any. */
export interface Line {
  pieces: Piece[];
  end: Piece | null;
}

const NEWLINES = ['\r\n', '\n', '\r'];

export function scanCsv(text: string, opts: PaintOptions = {}): Line[] {
  const delims = (Array.isArray(opts.delimiter) ? opts.delimiter : [opts.delimiter ?? ',']).filter(
    (d: string) => d.length > 0,
  );
  const quote = opts.quoteChar ?? '"';
  const esc = opts.escapeChar ?? quote;
  const lines: Line[] = [];
  let line: Line = { pieces: [], end: null };
  let inQuote = false;
  let fieldStart = true;
  let lineStart = true;
  let i = 0;

  const push = (kind: PieceKind, t: string): void => {
    const last = line.pieces.at(-1);
    if (last && last.kind === kind && kind === 'text') last.text += t;
    else line.pieces.push({ kind, text: t });
  };
  const newlineAt = (at: number): string | undefined => NEWLINES.find((n) => text.startsWith(n, at));
  const breakLine = (kind: PieceKind, nl: string): void => {
    line.end = { kind, text: nl };
    lines.push(line);
    line = { pieces: [], end: null };
  };

  while (i < text.length) {
    const nl = newlineAt(i);
    if (!inQuote && lineStart && opts.comments && text.startsWith(opts.comments, i)) {
      let j = i;
      while (j < text.length && !newlineAt(j)) j++;
      push('comment', text.slice(i, j));
      i = j;
      continue;
    }
    lineStart = false;
    if (inQuote) {
      if (esc !== quote && text.startsWith(esc + quote, i)) {
        push('esc', esc + quote);
        i += esc.length + quote.length;
      } else if (text.startsWith(quote + quote, i) && esc === quote) {
        push('esc', quote + quote);
        i += quote.length * 2;
      } else if (text.startsWith(quote, i)) {
        push('quote', quote);
        inQuote = false;
        fieldStart = false;
        i += quote.length;
      } else if (nl) {
        breakLine('nl-in', nl);
        i += nl.length;
      } else {
        push('text', text[i]!);
        i++;
      }
      continue;
    }
    const delim = delims.find((d) => text.startsWith(d, i));
    if (fieldStart && quote && text.startsWith(quote, i)) {
      push('quote', quote);
      inQuote = true;
      i += quote.length;
    } else if (delim) {
      push('sep', delim);
      fieldStart = true;
      i += delim.length;
    } else if (nl) {
      breakLine('nl', nl);
      fieldStart = true;
      lineStart = true;
      i += nl.length;
    } else {
      push('text', text[i]!);
      fieldStart = false;
      i++;
    }
  }
  lines.push(line);
  return lines;
}

/** How an invisible character is shown. */
export const GLYPHS: Readonly<Record<string, string>> = {
  '\r\n': '␍↵',
  '\n': '↵',
  '\r': '␍',
  '\t': '⇥',
  '\u001e': '␞',
  '\u001f': '␟',
  '﻿': 'BOM',
};
