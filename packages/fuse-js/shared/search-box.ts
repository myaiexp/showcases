// A search box: a real input in the full view, a box that types by itself in cards
import type { Stage } from './stage.ts';

export interface SearchBox {
  el: HTMLElement;
  /** The current text. */
  readonly value: string;
  /** Replaces the text and tells the listeners. */
  set(text: string): void;
  /** Types `text` a letter at a time, telling the listeners after each letter. */
  type(text: string, ms?: number): Promise<void>;
  /** Deletes the text a letter at a time. */
  erase(ms?: number): Promise<void>;
  onInput(fn: (text: string) => void): void;
}

export interface SearchBoxOptions {
  placeholder?: string;
  /** Text the box starts with. */
  value?: string;
  /** Full view only: queries offered as one-click chips under the box. */
  tries?: readonly string[];
  /** A short label in front of the box, e.g. "Search". */
  label?: string;
}

/** Builds the box into `parent`. In a card it is read-only and driven by type()/erase(). */
export function searchBox(parent: HTMLElement, stage: Stage, opts: SearchBoxOptions = {}): SearchBox {
  const el = document.createElement('div');
  el.className = 'fz-search';
  if (opts.label) {
    const l = document.createElement('span');
    l.className = 'fz-search-label';
    l.textContent = opts.label;
    el.append(l);
  }
  const listeners: ((text: string) => void)[] = [];
  let text = opts.value ?? '';
  const tell = (): void => listeners.forEach((fn) => fn(text));

  let paint: () => void;
  if (stage.preview) {
    const box = document.createElement('div');
    box.className = 'fz-input fz-fake';
    const shown = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'fz-caret';
    const ph = document.createElement('span');
    ph.className = 'fz-ph';
    box.append(shown, caret, ph);
    el.append(box);
    const blink = caret.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 530, iterations: Infinity, direction: 'alternate', easing: 'steps(1)' });
    stage.onDispose(() => blink.cancel());
    paint = () => {
      shown.textContent = text;
      ph.textContent = text ? '' : (opts.placeholder ?? '');
    };
  } else {
    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'fz-input';
    input.placeholder = opts.placeholder ?? 'Search…';
    input.spellcheck = false;
    input.autocomplete = 'off';
    input.addEventListener('input', () => {
      text = input.value;
      tell();
    });
    el.append(input);
    paint = () => {
      if (input.value !== text) input.value = text;
    };
    if (opts.tries?.length) {
      const row = document.createElement('div');
      row.className = 'fz-tries';
      row.append('Try ');
      for (const q of opts.tries) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'fz-try';
        b.textContent = q;
        b.addEventListener('click', () => {
          api.set(q);
          input.focus();
        });
        row.append(b);
      }
      parent.append(el, row);
    }
  }
  if (!el.isConnected) parent.append(el);
  paint();

  const api: SearchBox = {
    el,
    get value() {
      return text;
    },
    set(t) {
      text = t;
      paint();
      tell();
    },
    async type(t, ms = 110) {
      for (const ch of t) {
        await stage.wait(ms);
        api.set(text + ch);
      }
    },
    async erase(ms = 35) {
      while (text) {
        await stage.wait(ms);
        api.set(text.slice(0, -1));
      }
    },
    onInput(fn) {
      listeners.push(fn);
    },
  };
  return api;
}

/**
 * Card loop: types each query in turn, holds it for `hold` ms, erases it, and moves on.
 * Does nothing in the full view, where the reader types.
 */
export function typeLoop(stage: Stage, box: SearchBox, queries: readonly string[], hold = 1800): void {
  if (!stage.preview) return;
  stage.play(async (wait) => {
    // A box that starts with text would otherwise get the queries typed onto its end.
    if (box.value) {
      await wait(hold);
      await box.erase();
    }
    for (const q of queries) {
      await box.type(q);
      await wait(hold);
      await box.erase();
      await wait(250);
    }
  });
}
