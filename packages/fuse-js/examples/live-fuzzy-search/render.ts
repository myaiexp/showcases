// DOM renderers for Fuse results with highlighted matches, no innerHTML
import type { FuseResult } from 'fuse.js';
import type { Pkg } from './data.ts';

/** Builds `text` as DOM nodes, wrapping each matched index range in <mark>. */
const highlight = (text: string, indices: readonly (readonly [number, number])[] | undefined): Node[] => {
  if (!indices || indices.length === 0) return [document.createTextNode(text)];
  const chars = [...text];
  const on = new Array<boolean>(chars.length).fill(false);
  for (const [start, end] of indices) for (let i = start; i <= end; i++) on[i] = true;
  const nodes: Node[] = [];
  let run = '';
  let marked = false;
  const flush = (): void => {
    if (!run) return;
    if (marked) {
      const m = document.createElement('mark');
      m.textContent = run;
      nodes.push(m);
    } else {
      nodes.push(document.createTextNode(run));
    }
    run = '';
  };
  chars.forEach((ch, i) => {
    if ((on[i] ?? false) !== marked) {
      flush();
      marked = on[i] ?? false;
    }
    run += ch;
  });
  flush();
  return nodes;
};

const item = (name: Node[], desc: Node[], score?: number): HTMLLIElement => {
  const li = document.createElement('li');
  const n = document.createElement('div');
  n.className = 'result-name';
  n.append(...name);
  const d = document.createElement('div');
  d.className = 'result-desc';
  d.append(...desc);
  li.append(n, d);
  if (score !== undefined) {
    const s = document.createElement('div');
    s.className = 'result-score';
    s.textContent = `score: ${score.toFixed(4)}`;
    li.append(s);
  }
  return li;
};

export const renderResults = (
  results: readonly FuseResult<Pkg>[],
  list: HTMLElement,
  limit = 10,
): void => {
  if (results.length === 0) {
    const li = document.createElement('li');
    li.className = 'no-match';
    li.textContent = 'No matches found';
    list.replaceChildren(li);
    return;
  }
  list.replaceChildren(
    ...results.slice(0, limit).map((r) => {
      const nameM = r.matches?.find((m) => m.key === 'name');
      const descM = r.matches?.find((m) => m.key === 'description');
      return item(
        highlight(r.item.name, nameM?.indices),
        highlight(r.item.description, descM?.indices),
        r.score ?? 0,
      );
    }),
  );
};

export const renderAll = (pkgs: readonly Pkg[], list: HTMLElement): void => {
  list.replaceChildren(
    ...pkgs.map((p) => item([document.createTextNode(p.name)], [document.createTextNode(p.description)])),
  );
};
