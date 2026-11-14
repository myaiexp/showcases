// Scene parts: caption with the call being made, result panel, event log, columns
import { fmt } from './format.ts';

/** Splits `parent` into side-by-side columns; `flex` gives each one's grow factor. */
export function columns(parent: HTMLElement, ...flex: number[]): HTMLElement[] {
  const row = document.createElement('div');
  row.className = 'dx-cols';
  parent.append(row);
  return flex.map((f) => {
    const col = document.createElement('div');
    col.className = 'dx-col';
    col.style.flex = `${f} 1 0`;
    row.append(col);
    return col;
  });
}

export interface Caption {
  el: HTMLElement;
  /** `say` is the plain-language step; `code` the Dexie call that does it. */
  set(say: string, code?: string): void;
}

/** Two lines over the scene: what happens, and the call that makes it happen. */
export function caption(parent: HTMLElement): Caption {
  const el = document.createElement('div');
  el.className = 'dx-caption';
  const say = document.createElement('div');
  say.className = 'dx-say';
  const code = document.createElement('code');
  code.className = 'dx-code';
  el.append(say, code);
  parent.append(el);
  return {
    el,
    set(s, c) {
      say.textContent = s;
      code.textContent = c ?? '';
      code.style.display = c ? '' : 'none';
      el.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 300 });
    },
  };
}

export interface ResultPanel {
  el: HTMLElement;
  /** An ordered list of results, numbered, appearing one by one. */
  list(items: readonly unknown[], tone?: 'ok' | 'warn' | 'bad'): void;
  /** One value, shown large (a count, a key, a found record). */
  value(v: unknown, sub?: string, tone?: 'ok' | 'warn' | 'bad'): void;
  /** Small grey text, e.g. "waiting…" or "nothing found". */
  idle(text: string): void;
  clear(): void;
}

/** The answer side of a scene: what the call returned. */
export function resultPanel(parent: HTMLElement, title = 'returned'): ResultPanel {
  const el = document.createElement('div');
  el.className = 'dx-result';
  const head = document.createElement('div');
  head.className = 'dx-result-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'dx-result-body';
  el.append(head, body);
  parent.append(el);

  const appear = (node: HTMLElement, i: number): void => {
    node.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], {
      duration: 260,
      delay: i * 90,
      fill: 'backwards',
    });
  };

  return {
    el,
    list(items, tone = 'ok') {
      body.replaceChildren();
      if (items.length === 0) {
        const none = document.createElement('div');
        none.className = 'dx-idle';
        none.textContent = 'nothing ([])';
        body.append(none);
        return;
      }
      items.forEach((item, i) => {
        const chip = document.createElement('div');
        chip.className = `dx-chip dx-${tone}`;
        const n = document.createElement('b');
        n.textContent = String(i + 1);
        chip.append(n, typeof item === 'string' ? item : fmt(item, 40));
        body.append(chip);
        appear(chip, i);
      });
    },
    value(v, sub, tone = 'ok') {
      body.replaceChildren();
      const big = document.createElement('div');
      big.className = `dx-big dx-${tone}`;
      big.textContent = v === undefined ? 'undefined' : typeof v === 'string' ? v : fmt(v, 40);
      body.append(big);
      if (sub) {
        const s = document.createElement('div');
        s.className = 'dx-idle';
        s.textContent = sub;
        body.append(s);
      }
      appear(big, 0);
    },
    idle(text) {
      body.replaceChildren();
      const s = document.createElement('div');
      s.className = 'dx-idle';
      s.textContent = text;
      body.append(s);
    },
    clear() {
      body.replaceChildren();
    },
  };
}

export type LogTone = 'info' | 'ok' | 'warn' | 'bad' | 'muted';

export interface Log {
  el: HTMLElement;
  add(text: string, tone?: LogTone): void;
  clear(): void;
}

/** A running list of events, newest at the bottom, oldest dropped past `max`. */
export function eventLog(parent: HTMLElement, title = 'events', max = 40): Log {
  const el = document.createElement('div');
  el.className = 'dx-log';
  const head = document.createElement('div');
  head.className = 'dx-result-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'dx-log-body';
  el.append(head, body);
  parent.append(el);
  return {
    el,
    add(text, tone = 'info') {
      const line = document.createElement('div');
      line.className = `dx-line dx-${tone}`;
      line.textContent = text;
      body.append(line);
      while (body.childElementCount > max) body.firstElementChild!.remove();
      body.scrollTop = body.scrollHeight;
      line.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 });
    },
    clear() {
      body.replaceChildren();
    },
  };
}
