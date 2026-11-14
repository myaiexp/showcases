// Small pictures for Papa Parse examples: stat pills, a log, progress, a file
import { visible } from './csv-view.ts';
import './widgets.css';

export interface Stats {
  el: HTMLElement;
  /** Sets (or adds) the pill `key`; `tone` colours it. */
  set(key: string, value: string | number | boolean, tone?: 'ok' | 'warn' | 'bad'): void;
  clear(): void;
}

/** A row of "value label" pills, e.g. "5 rows", "; delimiter". */
export function stats(parent: HTMLElement): Stats {
  const el = document.createElement('div');
  el.className = 'pp-stats';
  parent.append(el);
  const pills = new Map<string, HTMLElement>();
  return {
    el,
    set(key, value, tone) {
      let pill = pills.get(key);
      if (!pill) {
        pill = document.createElement('span');
        pills.set(key, pill);
        el.append(pill);
      }
      pill.className = tone ? `pp-pill pp-${tone}` : 'pp-pill';
      const b = document.createElement('b');
      b.textContent = typeof value === 'string' ? visible(value) : String(value);
      pill.replaceChildren(b, ` ${key}`);
    },
    clear() {
      pills.clear();
      el.replaceChildren();
    },
  };
}

export interface Log {
  el: HTMLElement;
  add(text: string, tone?: 'ok' | 'warn' | 'bad' | 'dim'): HTMLElement;
  clear(): void;
}

/** A list of events, newest at the bottom, keeping the last `max` lines. */
export function eventLog(parent: HTMLElement, max = 40): Log {
  const el = document.createElement('div');
  el.className = 'pp-log';
  parent.append(el);
  return {
    el,
    add(text, tone) {
      const line = document.createElement('div');
      line.textContent = text;
      if (tone) line.className = `pp-${tone}`;
      el.append(line);
      while (el.childElementCount > max) el.firstElementChild!.remove();
      el.scrollTop = el.scrollHeight;
      return line;
    },
    clear() {
      el.replaceChildren();
    },
  };
}

export interface Progress {
  el: HTMLElement;
  /** 0..1, with an optional label on the bar. */
  set(fraction: number, label?: string): void;
  /** Adds a tick mark at `fraction` (a chunk boundary, a request). */
  tick(fraction: number): void;
  reset(): void;
}

export function progress(parent: HTMLElement): Progress {
  const el = document.createElement('div');
  el.className = 'pp-progress';
  const fill = document.createElement('div');
  fill.className = 'pp-progress-fill';
  const text = document.createElement('span');
  el.append(fill, text);
  parent.append(el);
  return {
    el,
    set(f, label = '') {
      fill.style.width = `${Math.max(0, Math.min(1, f)) * 100}%`;
      text.textContent = label;
    },
    tick(f) {
      const t = document.createElement('i');
      t.style.left = `${f * 100}%`;
      el.append(t);
    },
    reset() {
      fill.style.width = '0';
      text.textContent = '';
      el.querySelectorAll('i').forEach((t) => t.remove());
    },
  };
}

/** Human size: 1.2 KB, 3.4 MB. */
export function size(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** A file drawn as a document icon with its name and size. */
export function fileChip(file: { name: string; size: number }): HTMLElement {
  const el = document.createElement('div');
  el.className = 'pp-file';
  const icon = document.createElement('span');
  icon.className = 'pp-file-icon';
  icon.textContent = file.name.split('.').pop()?.toUpperCase().slice(0, 4) ?? 'CSV';
  const name = document.createElement('span');
  name.className = 'pp-file-name';
  name.textContent = file.name;
  const sz = document.createElement('span');
  sz.className = 'pp-file-size';
  sz.textContent = size(file.size);
  el.append(icon, name, sz);
  return el;
}

/** A big centred word or number with a small label, e.g. the detected delimiter. */
export function bigValue(parent: HTMLElement, label: string): { el: HTMLElement; set(v: string, tone?: 'ok' | 'warn' | 'bad'): void } {
  const el = document.createElement('div');
  el.className = 'pp-big';
  const v = document.createElement('b');
  const l = document.createElement('span');
  l.textContent = label;
  el.append(v, l);
  parent.append(el);
  return {
    el,
    set(value, tone) {
      v.textContent = value;
      v.className = tone ? `pp-${tone}` : '';
    },
  };
}
