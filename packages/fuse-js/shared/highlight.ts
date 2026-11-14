// Paints the letters Fuse matched: text split into plain runs and <mark> runs
import type { FuseResult, FuseResultMatch, RangeTuple } from 'fuse.js';

/** `text` as DOM nodes, each [start, end] range (end inclusive) wrapped in <mark>. */
export function highlight(text: string, indices?: readonly RangeTuple[] | readonly (readonly number[])[]): Node[] {
  if (!indices || indices.length === 0) return [document.createTextNode(text)];
  const on = new Array<boolean>(text.length).fill(false);
  for (const [start = 0, end = start] of indices) for (let i = start; i <= end && i < text.length; i++) on[i] = true;
  const nodes: Node[] = [];
  let run = '';
  let marked = false;
  const flush = (): void => {
    if (!run) return;
    if (marked) {
      const m = document.createElement('mark');
      m.textContent = run;
      nodes.push(m);
    } else nodes.push(document.createTextNode(run));
    run = '';
  };
  for (let i = 0; i < text.length; i++) {
    if (on[i] !== marked) {
      flush();
      marked = on[i]!;
    }
    run += text[i];
  }
  flush();
  return nodes;
}

/**
 * The match entry for `key` in a result (undefined when that key did not match). For a key
 * that holds an array, pass `refIndex` to pick the element.
 */
export function matchOf<T>(result: FuseResult<T>, key?: string, refIndex?: number): FuseResultMatch | undefined {
  return result.matches?.find((m) => m.key === key && (refIndex === undefined || m.refIndex === refIndex));
}

/** `text` with the letters Fuse matched in `key` marked. */
export function marked<T>(result: FuseResult<T>, key: string | undefined, text: string, refIndex?: number): Node[] {
  return highlight(text, matchOf(result, key, refIndex)?.indices);
}

/** Wraps nodes in a span with a class, for a labelled field inside a row. */
export function field(cls: string, nodes: Node[] | string): HTMLElement {
  const s = document.createElement('span');
  s.className = cls;
  if (typeof nodes === 'string') s.textContent = nodes;
  else s.append(...nodes);
  return s;
}
