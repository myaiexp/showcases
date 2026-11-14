// Small pictures for Fuse.js examples: stat pills, a call line, side-by-side columns
import type { Stage } from './stage.ts';

export interface Pills {
  el: HTMLElement;
  /** Sets (or adds) the pill `key`, shown as "value key"; `tone` colours it. */
  set(key: string, value: string | number, tone?: 'ok' | 'warn' | 'bad'): void;
}

/** A row of "value label" pills, e.g. "3 matches", "0.6 threshold". */
export function pills(parent: HTMLElement): Pills {
  const el = document.createElement('div');
  el.className = 'fz-pills';
  parent.append(el);
  const map = new Map<string, HTMLElement>();
  return {
    el,
    set(key, value, tone) {
      let pill = map.get(key);
      if (!pill) {
        pill = document.createElement('span');
        map.set(key, pill);
        el.append(pill);
      }
      pill.className = tone ? `fz-pill fz-${tone}` : 'fz-pill';
      const b = document.createElement('b');
      b.textContent = String(value);
      pill.replaceChildren(b, ` ${key}`);
    },
  };
}

export interface CallLine {
  el: HTMLElement;
  set(text: string): void;
}

/** One line of code in a chip, e.g. fuse.search('recat'), kept in sync by the example. */
export function callLine(parent: HTMLElement, text = ''): CallLine {
  const el = document.createElement('code');
  el.className = 'fz-call';
  el.textContent = text;
  parent.append(el);
  return {
    el,
    set(t) {
      el.textContent = t;
    },
  };
}

export interface Column {
  el: HTMLElement;
  /** The heading over the column. */
  head: HTMLElement;
  /** Where the column's content goes. */
  body: HTMLElement;
}

/** Side-by-side columns with headings, for "this way vs that way" examples. */
export function columns(stage: Stage, titles: readonly string[], parent: HTMLElement = stage.root): Column[] {
  const row = document.createElement('div');
  row.className = 'fz-cols';
  row.style.gridTemplateColumns = `repeat(${titles.length}, minmax(0, 1fr))`;
  parent.append(row);
  return titles.map((t) => {
    const el = document.createElement('section');
    el.className = 'fz-col';
    const head = document.createElement('div');
    head.className = 'fz-col-head';
    head.textContent = t;
    const body = document.createElement('div');
    body.className = 'fz-col-body';
    el.append(head, body);
    row.append(el);
    return { el, head, body };
  });
}

/** A labelled box of text, e.g. a long description with its matched letters marked. */
export function textBox(parent: HTMLElement, cls = ''): HTMLElement {
  const el = document.createElement('div');
  el.className = `fz-textbox ${cls}`.trim();
  parent.append(el);
  return el;
}

/** Quotes a query the way the code would show it: 'recat'. */
export const q = (s: string): string => `'${s.replace(/'/g, "\\'")}'`;
