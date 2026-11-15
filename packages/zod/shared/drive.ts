// Sample inputs: cycled in cards, buttons and a JSON editor in the full view
import type { Stage } from './stage.ts';

export interface Sample {
  /** Button text in the full view. */
  label: string;
  value: unknown;
}

export interface DriveOptions {
  /** Card: ms per sample. */
  ms?: number;
  /** Full view: also show the value as editable JSON in `parent`. */
  editor?: HTMLElement;
}

export interface Driver {
  /** Shows sample `i` (also used by the reader's buttons). */
  pick(i: number): void;
  /** The value shown now. */
  readonly value: unknown;
}

/** Plain JSON can show it: no undefined, dates, bigints, maps, sets or functions inside. */
function jsonSafe(v: unknown): boolean {
  if (v === null || typeof v === 'string' || typeof v === 'boolean') return true;
  if (typeof v === 'number') return Number.isFinite(v);
  if (Array.isArray(v)) return v.every(jsonSafe);
  if (typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) return Object.values(v).every(jsonSafe);
  return false;
}

export function drive(stage: Stage, samples: readonly Sample[], show: (value: unknown) => void, opts: DriveOptions = {}): Driver {
  let current: unknown = samples[0]?.value;
  let text: HTMLTextAreaElement | null = null;
  let status: HTMLElement | null = null;
  const buttons: HTMLButtonElement[] = [];

  const paintEditor = (): void => {
    if (!text || !status) return;
    if (jsonSafe(current)) {
      text.disabled = false;
      text.value = JSON.stringify(current, null, 2);
      status.textContent = 'Edit the JSON: it is checked as you type.';
      delete status.dataset['tone'];
    } else {
      text.disabled = true;
      text.value = '';
      status.textContent = 'This sample holds values plain JSON cannot write (dates, missing fields, big integers…), so it has no editor.';
      delete status.dataset['tone'];
    }
  };

  const api: Driver = {
    get value() {
      return current;
    },
    pick(i) {
      const s = samples[i];
      if (!s) return;
      current = s.value;
      buttons.forEach((b, j) => b.classList.toggle('zd-on', j === i));
      paintEditor();
      show(current);
    },
  };

  if (!stage.preview && stage.bar && samples.length > 1) {
    const label = document.createElement('span');
    label.className = 'zd-bar-label';
    label.textContent = 'Try:';
    stage.bar.append(label);
    samples.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'zd-try';
      b.textContent = s.label;
      b.addEventListener('click', () => api.pick(i));
      stage.bar!.append(b);
      buttons.push(b);
    });
  }
  if (!stage.preview && opts.editor) {
    const wrap = document.createElement('div');
    wrap.className = 'zd-editor';
    text = document.createElement('textarea');
    text.spellcheck = false;
    text.rows = 8;
    status = document.createElement('div');
    status.className = 'zd-editor-status';
    wrap.append(text, status);
    opts.editor.append(wrap);
    text.addEventListener('input', () => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(text!.value);
      } catch {
        status!.textContent = 'Not valid JSON yet: finish the edit (quotes, commas, brackets).';
        status!.dataset['tone'] = 'warn';
        return;
      }
      status!.textContent = 'Edit the JSON: it is checked as you type.';
      delete status!.dataset['tone'];
      buttons.forEach((b) => b.classList.remove('zd-on'));
      current = parsed;
      show(current);
    });
  }

  if (stage.preview) stage.cycle(samples, opts.ms ?? 2600, (_s, i) => api.pick(i));
  else api.pick(0);
  return api;
}
