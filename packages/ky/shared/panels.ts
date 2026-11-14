// Panels for Ky examples: the request as the server saw it, the result, a log
import type { Seen } from './server.ts';
import { pathOf } from './wire.ts';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

/** A titled box; content goes in `body`. */
export function panel(parent: HTMLElement, title: string): { el: HTMLElement; body: HTMLElement; title: HTMLElement } {
  const el = document.createElement('div');
  el.className = 'ky-panel';
  const head = document.createElement('div');
  head.className = 'ky-panel-title';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'ky-panel-body';
  el.append(head, body);
  parent.append(el);
  return { el, body, title: head };
}

function line(parent: HTMLElement, cls: string, text: string, tone?: Tone): HTMLElement {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  if (tone) d.dataset['tone'] = tone;
  parent.append(d);
  return d;
}

export interface RequestViewOptions {
  /** Header names to list, in this order. Default: content-type only. Use 'all' for every header. */
  headers?: readonly string[] | 'all';
  /** Show the body. Default true. */
  body?: boolean;
  /** Show the full URL with host instead of the path. Default false. */
  fullUrl?: boolean;
  /** Header names to highlight as the point of the example. */
  mark?: readonly string[];
}

/** What arrived at the server: method, URL, chosen headers and body. */
export function requestView(parent: HTMLElement, title = 'Server received', opts: RequestViewOptions = {}) {
  const p = panel(parent, title);
  const show = (req: Seen | null): void => {
    p.body.replaceChildren();
    if (!req) {
      line(p.body, 'ky-dim', 'nothing yet');
      return;
    }
    line(p.body, 'ky-req-line', `${req.method} ${opts.fullUrl ? decodeURIComponent(req.url.href) : pathOf(req.url)}`);
    const names = opts.headers === 'all' ? [...req.headers.keys()] : (opts.headers ?? ['content-type']);
    for (const name of names) {
      const value = req.headers.get(name);
      const marked = opts.mark?.includes(name);
      line(p.body, 'ky-header', `${name}: ${value ?? '(none)'}`, marked ? (value === null ? 'warn' : 'ok') : undefined);
    }
    if (opts.body !== false && req.body) line(p.body, 'ky-body', req.body);
  };
  show(null);
  return { ...p, show };
}

/** Pretty text for any value a Ky call returned. */
export function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return JSON.stringify(value);
  if (value instanceof Uint8Array) return `Uint8Array(${value.byteLength}) [${[...value.slice(0, 8)].join(', ')}${value.byteLength > 8 ? ', …' : ''}]`;
  if (value instanceof ArrayBuffer) return `ArrayBuffer(${value.byteLength} bytes)`;
  if (value instanceof Blob) return `Blob(${value.size} bytes, ${value.type || 'no type'})`;
  if (value instanceof Response) return `Response ${value.status} ${value.statusText}`;
  try {
    return JSON.stringify(value, null, 1).replace(/\n\s*/g, ' ');
  } catch {
    return String(value);
  }
}

/** The class name Ky gave an error, falling back to its `name`. */
export function errorName(err: unknown): string {
  if (err instanceof Error) return err.constructor.name !== 'Error' ? err.constructor.name : err.name;
  return typeof err;
}

/** What the code got back: a value, or the error it threw. */
export function resultView(parent: HTMLElement, title = 'Your code got') {
  const p = panel(parent, title);
  const api = {
    ...p,
    clear() {
      p.body.replaceChildren();
    },
    pending(text = 'waiting…') {
      p.body.replaceChildren();
      line(p.body, 'ky-dim', text);
    },
    value(v: unknown, note?: string) {
      p.body.replaceChildren();
      if (note) line(p.body, 'ky-badge', note, 'ok');
      line(p.body, 'ky-value', formatValue(v));
    },
    error(err: unknown, detail?: string) {
      p.body.replaceChildren();
      line(p.body, 'ky-badge', `throws ${errorName(err)}`, 'bad');
      line(p.body, 'ky-value', err instanceof Error ? err.message : String(err));
      if (detail) line(p.body, 'ky-dim', detail);
    },
  };
  api.clear();
  return api;
}

/** A list of short lines, newest last, capped at `max`. */
export function logView(parent: HTMLElement, title = 'Log', max = 6) {
  const p = panel(parent, title);
  p.body.classList.add('ky-log');
  return {
    ...p,
    add(text: string, tone?: Tone) {
      line(p.body, 'ky-log-line', text, tone);
      while (p.body.childElementCount > max) p.body.firstElementChild?.remove();
    },
    clear() {
      p.body.replaceChildren();
    },
  };
}
