// Small panes: what the app shows, key/value lists, columns, request descriptions
import type { ServerRequest } from './server.ts';
import type { Tone } from './wire.ts';
import './screen.css';

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

export interface Screen {
  el: HTMLElement;
  /** Replaces the text; `tone` colours it. A short fade shows that it changed. */
  show(text: string, tone?: Tone): void;
  clear(text?: string): void;
}

/** A pane for what the app itself ends up showing the user. */
export function screen(parent: HTMLElement, title = 'What the app shows', empty = '…'): Screen {
  const el = div('wr-screen');
  const head = div('wr-screen-title', title);
  const body = div('wr-screen-body wr-dim', empty);
  el.append(head, body);
  parent.append(el);
  return {
    el,
    show(text, tone = 'info') {
      body.textContent = text;
      body.className = `wr-screen-body wr-${tone}`;
      body.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 300 });
    },
    clear(text = empty) {
      body.textContent = text;
      body.className = 'wr-screen-body wr-dim';
    },
  };
}

export interface Kv {
  el: HTMLElement;
  /** Shows rows; values that differ from the previous call flash. */
  set(rows: readonly (readonly [string, string])[], note?: string): void;
}

/** A titled list of `key  value` rows. */
export function kv(parent: HTMLElement, title: string): Kv {
  const el = div('wr-kv');
  const head = div('wr-kv-title', title);
  const list = div('wr-kv-list');
  el.append(head, list);
  parent.append(el);
  let before = new Map<string, string>();
  return {
    el,
    set(rows, note) {
      const now = new Map<string, string>();
      list.replaceChildren();
      for (const [k, v] of rows) {
        const row = div('wr-kv-row');
        row.append(div('wr-kv-k', k), div('wr-kv-v', v));
        if (before.size && before.get(k) !== v) {
          row.animate([{ background: 'var(--accent-bg)' }, { background: 'transparent' }], { duration: 1400, easing: 'ease-out' });
        }
        now.set(k, v);
        list.append(row);
      }
      if (!rows.length) list.append(div('wr-kv-row wr-dim', note ?? 'nothing'));
      else if (note) list.append(div('wr-kv-note', note));
      before = now;
    },
  };
}

/** `n` equal columns inside `parent`. */
export function columns(parent: HTMLElement, n: number): HTMLElement[] {
  const grid = div('wr-cols');
  grid.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
  const cols = Array.from({ length: n }, () => div('wr-col'));
  grid.append(...cols);
  parent.append(grid);
  return cols;
}

/** The headers the request carried (only those named in `only`, if given), as rows. */
export function headerRows(req: ServerRequest, only?: string[]): [string, string][] {
  return req.headerList.filter(([k]) => !only || only.includes(k.toLowerCase()));
}

/** What one request carried that is not a header: the fetch options (cache, credentials, …). */
export function optionRows(req: ServerRequest): [string, string][] {
  return Object.entries(req.init).map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)]);
}

/** Two requests that are the same: method, address, headers and body. */
export function sameRequest(a: ServerRequest, b: ServerRequest): boolean {
  const heads = (r: ServerRequest): string => JSON.stringify([...r.headers.entries()].sort());
  return a.method === b.method && a.url === b.url && heads(a) === heads(b) && JSON.stringify(a.body) === JSON.stringify(b.body);
}
