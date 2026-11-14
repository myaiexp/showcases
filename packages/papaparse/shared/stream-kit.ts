// Streaming pictures: chunked text, file strip, request cards, live row ticker
import { visible } from './csv-view.ts';
import { ordersCsv, textFile } from './data.ts';
import type { RequestRecord } from './fake-server.ts';
import { dataTable } from './table.ts';
import { progress, size, stats, type Progress, type Stats } from './widgets.ts';
import './stream-kit.css';

const mk = (cls: string, text = '', tag = 'div'): HTMLElement => {
  const el = document.createElement(tag);
  el.className = cls;
  if (text) el.textContent = text;
  return el;
};

/** Orders as CSV text pieces of 5000 rows, so a big file is not one huge string build. */
function ordersParts(rows: number): string[] {
  const parts: string[] = [];
  for (let done = 0, seed = 1; done < rows; done += 5000, seed++) {
    const text = ordersCsv(Math.min(5000, rows - done), { seed });
    parts.push(done === 0 ? text : text.slice(text.indexOf('\n')));
  }
  return parts;
}

/** CSV text of `rows` orders (a header, then the rows). */
export const bigOrdersCsv = (rows: number): string => ordersParts(rows).join('');

/** A File of `rows` orders: the stand-in for a big export on the reader's disk. */
export const ordersFile = (name: string, rows: number): File => textFile(name, ordersParts(rows));

export interface ChunkText {
  el: HTMLElement;
  /** Marks chunks 0..i as read and chunk i as the one being parsed. */
  read(i: number): void;
  reset(): void;
}

/** File text cut into chunks of `chunkSize` characters, each a tinted run; reading lights them up. */
export function chunkText(parent: HTMLElement, text: string, chunkSize: number): ChunkText {
  const el = mk('pp-sk-text');
  const runs: HTMLElement[] = [];
  for (let at = 0; at < text.length; at += chunkSize) {
    const run = mk(`pp-sk-run pp-sk-run${runs.length % 2}`, '', 'span');
    run.textContent = visible(text.slice(at, at + chunkSize));
    runs.push(run);
    el.append(run);
  }
  parent.append(el);
  return {
    el,
    read(i) {
      runs.forEach((r, n) => {
        r.classList.toggle('pp-sk-read', n <= i);
        r.classList.toggle('pp-sk-now', n === i);
      });
    },
    reset() {
      runs.forEach((r) => r.classList.remove('pp-sk-read', 'pp-sk-now'));
    },
  };
}

export interface Strip {
  el: HTMLElement;
  /** A block over bytes `start`..`end` of the file; returns it so it can be restyled. */
  add(start: number, end: number, label?: string, tone?: 'ok' | 'warn' | 'bad' | 'wait'): HTMLElement;
  reset(): void;
}

/** The file drawn as a bar of `total` bytes; each chunk or request is a block along it. */
export function strip(parent: HTMLElement, total: number): Strip {
  const el = mk('pp-sk-strip');
  parent.append(el);
  return {
    el,
    add(start, end, label = '', tone = 'ok') {
      const block = mk(`pp-sk-block pp-sk-${tone}`, label, 'span');
      block.style.left = `${(start / total) * 100}%`;
      block.style.width = `${((Math.min(end, total) - start) / total) * 100}%`;
      el.append(block);
      block.animate([{ opacity: 0, transform: 'scaleY(0.4)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' });
      return block;
    },
    reset() {
      el.replaceChildren();
    },
  };
}

const STATUS: Record<number, string> = { 200: 'OK', 206: 'Partial Content', 403: 'Forbidden', 404: 'Not Found', 500: 'Server Error' };

export interface RequestView {
  el: HTMLElement;
  /** Draw or update a request; pass it from the fake server's onRequest. */
  show(r: RequestRecord): void;
  clear(): void;
}

export interface RequestViewOptions {
  /** Keep this many requests, newest last. Default 3. */
  max?: number;
  /** Always print the withCredentials flag. */
  credentials?: boolean;
  /** Print the timeout. */
  timeout?: boolean;
}

/** Each request as a small card: the line, its headers and body, then the answer. */
export function requestView(parent: HTMLElement, opts: RequestViewOptions = {}): RequestView {
  const el = mk('pp-sk-requests');
  parent.append(el);
  const cards = new Map<RequestRecord, HTMLElement>();
  const max = opts.max ?? 3;
  return {
    el,
    show(r) {
      let card = cards.get(r);
      if (!card) {
        card = mk('pp-sk-req');
        cards.set(r, card);
        el.append(card);
        while (el.childElementCount > max) el.firstElementChild!.remove();
      }
      const path = new URL(r.url).pathname;
      const lines: [string, string][] = [[`→ ${r.method} ${path}`, 'pp-sk-line']];
      for (const [k, v] of Object.entries(r.headers)) lines.push([`${k}: ${v}`, 'pp-sk-head']);
      if (typeof r.body === 'string') lines.push([`body: ${r.body}`, 'pp-sk-body']);
      if (opts.credentials) lines.push([`withCredentials: ${r.withCredentials}`, r.withCredentials ? 'pp-sk-flag' : 'pp-sk-head']);
      if (opts.timeout && r.timeout) lines.push([`timeout: ${r.timeout} ms`, 'pp-sk-head']);
      if (r.outcome === 'timed out') lines.push([`← no answer within ${r.timeout} ms`, 'pp-bad']);
      else if (r.outcome === 'aborted') lines.push(['← abandoned', 'pp-warn']);
      else if (r.status !== undefined) {
        lines.push([`← ${r.status} ${STATUS[r.status] ?? ''} · ${size(r.bytes ?? 0)}`, r.status < 400 ? 'pp-ok' : 'pp-bad']);
      } else lines.push(['← waiting…', 'pp-dim']);
      card.replaceChildren(
        ...lines.map(([text, cls]) => {
          const line = mk(cls, text);
          return line;
        }),
      );
    },
    clear() {
      cards.clear();
      el.replaceChildren();
    },
  };
}

export interface Ticker {
  stats: Stats;
  bar: Progress;
  /** The last few rows that arrived. */
  latest: HTMLElement;
  /** Redraws the latest rows (call at most once per frame). */
  rows(rows: readonly unknown[]): void;
}

/** A counter, a progress bar and the newest rows: for parses that stream rows to you. */
export function ticker(parent: HTMLElement, keep = 3): Ticker {
  const s = stats(parent);
  const bar = progress(parent);
  const latest = mk('pp-sk-latest');
  parent.append(latest);
  return {
    stats: s,
    bar,
    latest,
    rows(rows) {
      latest.replaceChildren(dataTable(rows.slice(-keep), { numbered: false }));
    },
  };
}

/** A one-line box for an outcome that is not rows: an error message, "waiting…". */
export function notice(text: string, tone: 'ok' | 'warn' | 'bad' | 'dim' = 'dim'): HTMLElement {
  return mk(`pp-sk-notice pp-sk-notice-${tone}`, text);
}
