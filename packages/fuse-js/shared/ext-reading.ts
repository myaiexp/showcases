// A line showing how Fuse reads a query: OR groups of AND terms, in plain words
import { operatorOf, parseExt, type Group } from './ext-query.ts';
import './ext-reading.css';

export interface Reading {
  el: HTMLElement;
  /** Shows `query` (or the groups already parsed from it); returns the groups. */
  set(query: string | Group[]): Group[];
}

/** Colours a shelf's hit tiles by OR group: pass the group number per tile (or null). */
export function tintTile(tile: Element | undefined, group: number | null): void {
  if (!tile) return;
  if (group === null) delete (tile as HTMLElement).dataset['group'];
  else (tile as HTMLElement).dataset['group'] = String(group % 4);
}

/** `show: false` builds nothing visible (cards with no room), but set() still parses. */
export function reading(parent: HTMLElement, show = true): Reading {
  const el = document.createElement('div');
  el.className = 'fz-read';
  if (show) parent.append(el);
  const api: Reading = {
    el,
    set(query) {
      const groups = typeof query === 'string' ? parseExt(query) : query;
      if (!groups.length) {
        const none = document.createElement('span');
        none.className = 'fz-rnone';
        none.textContent = 'No query: everything is returned';
        el.replaceChildren(none);
        return groups;
      }
      const parts: Node[] = [];
      groups.forEach((g, gi) => {
        if (gi > 0) {
          const or = document.createElement('span');
          or.className = 'fz-rjoin fz-or';
          or.textContent = 'OR';
          parts.push(or);
        }
        const box = document.createElement('span');
        box.className = 'fz-rgroup';
        box.dataset['group'] = String(gi % 4);
        g.terms.forEach((t, ti) => {
          if (ti > 0) {
            const and = document.createElement('span');
            and.className = 'fz-rjoin';
            and.textContent = 'AND';
            box.append(and);
          }
          const term = document.createElement('span');
          term.className = 'fz-rterm';
          const b = document.createElement('b');
          b.textContent = t.text;
          term.append(`${operatorOf(t.op).verb} `, b);
          box.append(term);
        });
        parts.push(box);
      });
      el.replaceChildren(...parts);
      return groups;
    },
  };
  return api;
}
