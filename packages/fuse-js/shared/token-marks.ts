// Which query word matched where: one single-word search per word, each in its own colour
import type Fuse from 'fuse.js';
import type { FuseResult, RangeTuple } from 'fuse.js';
import './token-marks.css';

/** Fuse's default token pattern, so the examples split a query the way Fuse does. */
export const WORD_PATTERN = /[\p{L}\p{M}\p{N}_]+/gu;

/** The query's words as the default tokenizer finds them, lower-cased. */
export function wordsOf(query: string, pattern: RegExp = WORD_PATTERN): string[] {
  return query.toLowerCase().match(pattern) ?? [];
}

export interface WordHits {
  words: readonly string[];
  /** For word i: the single-word search results by refIndex. */
  per: Map<number, FuseResult<any>>[];
}

/**
 * Runs `fuse.search(word)` for each word. With token search a one-word query is one term, so
 * a record is in `per[i]` exactly when that term matched somewhere in it (needs includeMatches
 * to also paint the letters).
 */
export function wordHits<T>(fuse: Fuse<T>, words: readonly string[]): WordHits {
  const per = words.map((w) => new Map(fuse.search(w).map((r) => [r.refIndex, r] as const)));
  return { words, per };
}

/** For each query word: did it match somewhere in record `ref`? */
export function matchedWords(h: WordHits, ref: number): boolean[] {
  return h.per.map((m) => m.has(ref));
}

/** `text` with the letters each query word matched in `key` painted in that word's colour. */
export function paintWords(h: WordHits, ref: number, key: string | undefined, text: string): Node[] {
  const owner = new Array<number>(text.length).fill(-1);
  h.per.forEach((m, i) => {
    const match = m.get(ref)?.matches?.find((x) => x.key === key);
    for (const [s = 0, e = s] of (match?.indices ?? []) as readonly RangeTuple[]) {
      for (let c = s; c <= e && c < text.length; c++) if (owner[c] === -1) owner[c] = i;
    }
  });
  const nodes: Node[] = [];
  for (let c = 0; c < text.length; ) {
    let end = c;
    while (end < text.length && owner[end] === owner[c]) end++;
    const run = text.slice(c, end);
    if (owner[c] === -1) nodes.push(document.createTextNode(run));
    else {
      const m = document.createElement('mark');
      m.className = `fz-w${owner[c]! % 4}`;
      m.textContent = run;
      nodes.push(m);
    }
    c = end;
  }
  return nodes;
}

/** A word chip in the word's colour; `on` false draws it faded (the word did not match). */
export function wordChip(word: string, i: number, on = true): HTMLElement {
  const s = document.createElement('span');
  s.className = `fz-wchip fz-w${i % 4}`;
  s.dataset['on'] = String(on);
  s.textContent = word;
  return s;
}

/** The chips of all the query words for one record: lit when matched, faded when not. */
export function wordDots(h: WordHits, ref: number): Node[] {
  const wrap = document.createElement('span');
  wrap.className = 'fz-wchips';
  matchedWords(h, ref).forEach((on, i) => wrap.append(wordChip(h.words[i]!, i, on)));
  return [wrap];
}

/** A row of chips for the query's words, e.g. under the search box. */
export function wordRow(parent: HTMLElement): { el: HTMLElement; set(words: readonly string[]): void } {
  const el = document.createElement('div');
  el.className = 'fz-wchips fz-wrow';
  parent.append(el);
  return {
    el,
    set(words) {
      el.replaceChildren(...words.map((w, i) => wordChip(w, i)));
    },
  };
}
