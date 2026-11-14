// Pieces for the HTTP errors and Error classes chapters: checklist, status chips
import { button } from './controls.ts';
import { formatValue, panel, type Tone } from './panels.ts';
import { serial } from './req-kit.ts';
import type { Stage } from './stage.ts';
import './err.css';

/** A Ky error's class name. `name` is set by Ky itself, so it survives minified builds. */
export const kyName = (err: unknown): string => (err instanceof Error ? err.name : typeof err);

/** Like resultView, but names the error by `name` (the gallery build mangles class names). */
export function outcome(parent: HTMLElement, title = 'Your code got') {
  const p = panel(parent, title);
  const put = (cls: string, text: string, tone?: Tone): void => {
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = text;
    if (tone) d.dataset['tone'] = tone;
    p.body.append(d);
  };
  return {
    ...p,
    pending(text = 'waiting…') {
      p.body.replaceChildren();
      put('ky-dim', text);
    },
    value(v: unknown, note?: string) {
      p.body.replaceChildren();
      if (note) put('ky-badge', note, 'ok');
      put('ky-value', formatValue(v));
    },
    error(err: unknown, detail?: string) {
      p.body.replaceChildren();
      put('ky-badge', `throws ${kyName(err)}`, 'bad');
      put('ky-value', err instanceof Error ? err.message : String(err));
      if (detail) put('ky-dim', detail);
    },
  };
}

/** Card: runs `run` over and over. Full view: runs it once and again on each click. */
export function loop(stage: Stage, run: () => Promise<void>, o: { pause?: number; label?: string } = {}): void {
  if (stage.preview) {
    stage.play(async (wait) => {
      await run();
      await wait(o.pause ?? 2000);
    });
    return;
  }
  const enqueue = serial(stage);
  button(stage.bar!, o.label ?? 'Run again', () => enqueue(run));
  enqueue(run);
}

export interface Row {
  /** Replaces the verdict on the right. */
  set(text: string, tone?: Tone): void;
  /** Tints the row from the left, a fraction from 0 to 1. */
  fill(fraction: number): void;
}

/** A panel of rows, each a label on the left and a verdict on the right. */
export function checklist(parent: HTMLElement, title: string) {
  const p = panel(parent, title);
  p.body.classList.add('err-list');
  return {
    ...p,
    clear() {
      p.body.replaceChildren();
    },
    add(label: string, text = '', tone?: Tone): Row {
      const row = document.createElement('div');
      row.className = 'err-row';
      const l = document.createElement('span');
      l.className = 'err-label';
      l.textContent = label;
      const v = document.createElement('span');
      v.className = 'err-verdict';
      row.append(l, v);
      p.body.append(row);
      const api: Row = {
        set(t, tone2) {
          v.textContent = t;
          if (tone2) row.dataset['tone'] = tone2;
          else delete row.dataset['tone'];
        },
        fill(f) {
          row.style.setProperty('--fill', `${Math.round(f * 100)}%`);
        },
      };
      api.set(text, tone);
      return api;
    },
  };
}

/** A grid of status-code chips. In the full view they are buttons that call `onPick`. */
export function statusGrid(parent: HTMLElement, statuses: readonly number[], full: boolean, onPick?: (status: number) => void) {
  const el = document.createElement('div');
  el.className = 'err-grid';
  if (full) el.dataset['wide'] = '';
  const chips = new Map<number, HTMLElement>();
  for (const s of statuses) {
    const chip = document.createElement(full ? 'button' : 'div');
    chip.className = 'err-chip';
    if (chip instanceof HTMLButtonElement) {
      chip.type = 'button';
      chip.addEventListener('click', () => onPick?.(s));
    }
    const num = document.createElement('b');
    num.textContent = String(s);
    const verdict = document.createElement('small');
    verdict.textContent = 'not asked';
    chip.append(num, verdict);
    el.append(chip);
    chips.set(s, chip);
  }
  parent.append(el);
  return {
    el,
    /** Rings the chip being asked about. */
    now(status: number | null) {
      for (const [s, c] of chips) {
        if (s === status) c.dataset['now'] = '';
        else delete c.dataset['now'];
      }
    },
    mark(status: number, text: string, tone: Tone) {
      const c = chips.get(status);
      if (!c) return;
      c.dataset['tone'] = tone;
      c.querySelector('small')!.textContent = text;
    },
    reset() {
      for (const c of chips.values()) {
        delete c.dataset['tone'];
        c.querySelector('small')!.textContent = 'not asked';
      }
    },
  };
}

/** A one-line message in the style of what a visitor would see on the page. */
export function toast(parent: HTMLElement, title: string) {
  const p = panel(parent, title);
  const el = document.createElement('div');
  el.className = 'err-toast ky-dim';
  el.textContent = 'nothing yet';
  p.body.append(el);
  return {
    ...p,
    show(text: string, tone?: Tone) {
      el.textContent = text;
      el.classList.remove('ky-dim');
      if (tone) el.dataset['tone'] = tone;
      else delete el.dataset['tone'];
    },
    clear() {
      el.textContent = 'nothing yet';
      el.classList.add('ky-dim');
      delete el.dataset['tone'];
    },
  };
}
