// A text field: real input in the full view, self-typing in cards, ✓/✗ state below
import type { Stage } from './stage.ts';

export interface Field {
  el: HTMLElement;
  readonly value: string;
  /** Replaces the text and tells the listeners. */
  set(text: string): void;
  /** Types `text` a letter at a time, telling the listeners after each letter. */
  type(text: string, ms?: number): Promise<void>;
  /** Deletes the text a letter at a time. */
  erase(ms?: number): Promise<void>;
  onInput(fn: (text: string) => void): void;
  /** Colours the field and writes the message under it: 'ok', 'bad', or null to clear. */
  state(ok: boolean | null, message?: string): void;
}

export interface FieldOptions {
  label?: string;
  placeholder?: string;
  value?: string;
  /** Full view only: sample texts offered as one-click chips under the field. */
  tries?: readonly string[];
  /** Hide the message line (the example shows the result elsewhere). */
  quiet?: boolean;
}

export function textField(parent: HTMLElement, stage: Stage, opts: FieldOptions = {}): Field {
  const el = document.createElement('div');
  el.className = 'zd-field';
  const line = document.createElement('label');
  line.className = 'zd-field-line';
  if (opts.label) {
    const l = document.createElement('span');
    l.className = 'zd-field-label';
    l.textContent = opts.label;
    line.append(l);
  }
  const msg = document.createElement('div');
  msg.className = 'zd-field-msg';
  el.append(line);
  if (!opts.quiet) el.append(msg);
  parent.append(el);

  const listeners: ((text: string) => void)[] = [];
  let text = opts.value ?? '';
  let box: HTMLElement;
  let paint: () => void;
  if (stage.preview) {
    box = document.createElement('div');
    box.className = 'zd-input zd-fake';
    const shown = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'zd-caret';
    const ph = document.createElement('span');
    ph.className = 'zd-ph';
    box.append(shown, caret, ph);
    const blink = caret.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 530, iterations: Infinity, direction: 'alternate', easing: 'steps(1)' });
    stage.onDispose(() => blink.cancel());
    paint = () => {
      shown.textContent = text;
      ph.textContent = text ? '' : (opts.placeholder ?? '');
    };
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'zd-input';
    input.placeholder = opts.placeholder ?? '';
    input.spellcheck = false;
    input.autocomplete = 'off';
    input.addEventListener('input', () => {
      text = input.value;
      listeners.forEach((fn) => fn(text));
    });
    box = input;
    paint = () => {
      if (input.value !== text) input.value = text;
    };
    if (opts.tries?.length) {
      const row = document.createElement('div');
      row.className = 'zd-tries';
      row.append('Try ');
      for (const t of opts.tries) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'zd-try';
        b.textContent = t === '' ? '(empty)' : t;
        b.addEventListener('click', () => {
          api.set(t);
          input.focus();
        });
        row.append(b);
      }
      el.append(row);
    }
  }
  line.append(box);
  paint();

  const api: Field = {
    el,
    get value() {
      return text;
    },
    set(t) {
      text = t;
      paint();
      listeners.forEach((fn) => fn(text));
    },
    async type(t, ms = 100) {
      for (const ch of t) {
        await stage.wait(ms);
        api.set(text + ch);
      }
    },
    async erase(ms = 30) {
      while (text) {
        await stage.wait(ms);
        api.set(text.slice(0, -1));
      }
    },
    onInput(fn) {
      listeners.push(fn);
    },
    state(ok, message = '') {
      if (ok === null) delete el.dataset['ok'];
      else el.dataset['ok'] = String(ok);
      msg.textContent = message;
    },
  };
  return api;
}

/**
 * Card loop: types each text in turn into `field`, holds it for `hold` ms, erases it and
 * moves on. Does nothing in the full view, where the reader types.
 */
export function typeLoop(stage: Stage, field: Field, texts: readonly string[], hold = 1600): void {
  if (!stage.preview) return;
  stage.play(async (wait) => {
    if (field.value) {
      await wait(hold);
      await field.erase();
    }
    for (const t of texts) {
      await field.type(t);
      await wait(hold);
      await field.erase();
      await wait(200);
    }
  });
}

/** Card loop over several fields at once: each step fills every field, then clears them. */
export function fillLoop(stage: Stage, fields: readonly Field[], steps: readonly (readonly string[])[], hold = 1800): void {
  if (!stage.preview) return;
  stage.play(async (wait) => {
    for (const step of steps) {
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i]!;
        if (f.value !== (step[i] ?? '')) {
          await f.erase(15);
          await f.type(step[i] ?? '', 55);
        }
      }
      await wait(hold);
    }
  });
}
