// A lane of hook chips that light up, in trip order, as Ky calls each hook
import type { Hooks } from 'ky';
import type { Tone } from './panels.ts';
import './hook.css';

export type HookName = 'init' | 'beforeRequest' | 'afterResponse' | 'beforeRetry' | 'beforeError';

/** The order a request meets them in. */
const ORDER: readonly HookName[] = ['init', 'beforeRequest', 'afterResponse', 'beforeRetry', 'beforeError'];

export interface HookCall {
  hook: HookName;
  /** The hook function's own name, or the hook's name. */
  label: string;
  start: number;
  /** Settles when the hook (sync or async) has finished or thrown. */
  done: Promise<void>;
}

export interface HookLane {
  el: HTMLElement;
  /** Wraps every function so its chip lights when Ky calls it; same shape back, so pass it as `hooks`. */
  hooks<T extends Hooks>(hooks: T): T;
  /** Writes what a hook just did under its chip. */
  note(hook: HookName, text: string, tone?: Tone): void;
  /** Calls `cb` whenever a hook starts (the gantt listens). */
  onCall(cb: (c: HookCall) => void): void;
  /** Back to the idle look, counts cleared. */
  reset(): void;
  dispose(): void;
}

/** `parent` is the scene; the lane is appended to it. */
export function hookLane(parent: HTMLElement): HookLane {
  const el = document.createElement('div');
  el.className = 'hook-lane';
  parent.append(el);
  const chips = new Map<HookName, { box: HTMLElement; count: HTMLElement; note: HTMLElement; n: number }>();
  const timers = new Map<HookName, ReturnType<typeof setTimeout>>();
  const listeners: ((c: HookCall) => void)[] = [];

  const ensure = (name: HookName) => {
    let c = chips.get(name);
    if (c) return c;
    const box = document.createElement('div');
    box.className = 'hook-chip';
    box.dataset['state'] = 'idle';
    const head = document.createElement('div');
    head.className = 'hook-name';
    const label = document.createElement('span');
    label.textContent = name;
    const count = document.createElement('span');
    count.className = 'hook-count';
    const note = document.createElement('div');
    note.className = 'hook-note';
    head.append(label, count);
    box.append(head, note);
    c = { box, count, note, n: 0 };
    chips.set(name, c);
    // Keep the chips in trip order whatever order the example defined them in.
    const next = ORDER.slice(ORDER.indexOf(name) + 1).map((h) => chips.get(h)?.box).find(Boolean);
    el.insertBefore(box, next ?? null);
    return c;
  };
  const light = (name: HookName): void => {
    const c = ensure(name);
    c.n++;
    c.count.textContent = `×${c.n}`;
    c.box.dataset['state'] = 'lit';
    clearTimeout(timers.get(name));
    timers.set(
      name,
      setTimeout(() => {
        c.box.dataset['state'] = 'ran';
      }, 700),
    );
  };

  return {
    el,
    hooks<T extends Hooks>(hooks: T): T {
      const out: Record<string, unknown> = {};
      for (const [key, list] of Object.entries(hooks) as [string, unknown][]) {
        if (!Array.isArray(list) || !ORDER.includes(key as HookName)) {
          out[key] = list;
          continue;
        }
        const name = key as HookName;
        ensure(name);
        out[key] = list.map((fn: (...a: unknown[]) => unknown) => {
          const wrapped = (...args: unknown[]): unknown => {
            light(name);
            const start = performance.now();
            let result: unknown;
            try {
              result = fn(...args);
            } catch (err) {
              for (const cb of listeners) cb({ hook: name, label: fn.name || name, start, done: Promise.resolve() });
              throw err;
            }
            const done = Promise.resolve(result).then(
              () => undefined,
              () => undefined,
            );
            for (const cb of listeners) cb({ hook: name, label: fn.name || name, start, done });
            return result;
          };
          return wrapped;
        });
      }
      return out as T;
    },
    note(hook, text, tone) {
      const c = ensure(hook);
      c.note.textContent = text;
      if (tone) c.note.dataset['tone'] = tone;
      else delete c.note.dataset['tone'];
    },
    onCall(cb) {
      listeners.push(cb);
    },
    reset() {
      for (const t of timers.values()) clearTimeout(t);
      timers.clear();
      for (const c of chips.values()) {
        c.n = 0;
        c.count.textContent = '';
        c.note.textContent = '';
        c.box.dataset['state'] = 'idle';
      }
    },
    dispose() {
      for (const t of timers.values()) clearTimeout(t);
      timers.clear();
      listeners.length = 0;
      el.remove();
    },
  };
}
