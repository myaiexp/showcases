// Shared Leaflet stage: map box, caption, controls, event log, timers, teardown
// Read shared/traps.md (Leaflet traps found while building the gallery) first.
import 'leaflet/dist/leaflet.css';
import type { MountContext } from '@/types.ts';
import { addButton, addSelect, addSlider, addToggle, type SelectOption } from './controls.ts';
import './stage.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** One line under the map in the full view, such as "Click the map". */
  hint?: string;
  /** Map height in the full view, px. Cards are always 200px. */
  height?: number;
}

export interface Step {
  /** Caption while the step shows. */
  say?: string;
  run: () => unknown;
  /** Pause after this step, ms (overrides the cycle's hold). */
  hold?: number;
}

export interface Stage {
  /** The div to hand `new LeafletMap(stage.box, …)`. */
  box: HTMLDivElement;
  /** Scene row the map sits in; side panels go here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Calls `map.remove()` (or any `remove()`) on cleanup, before the stage's DOM goes. Returns it. */
  own<T extends { remove(): unknown }>(thing: T): T;
  /** Sets the plain-English line under the map. */
  say(text: string, tone?: Tone): void;
  /**
   * An event log: in the full view a side panel keeping the last `keep` lines, in a card the
   * caption (latest line only). Returns the function that adds a line.
   */
  log(title?: string, keep?: number): (line: string) => void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects with STOPPED once the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Plays `steps` in order, holding `hold` ms after each, and loops until disposed. */
  cycle(steps: readonly Step[], hold?: number): void;
  /** A side panel beside the map (full view only); returns its <pre>, or null in a card. */
  side(title?: string): HTMLPreElement | null;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  slider(label: string, min: number, max: number, step: number, value: number, onInput: (v: number) => void): HTMLInputElement | null;
  toggle(label: string, checked: boolean, onChange: (on: boolean) => void): HTMLInputElement | null;
  select<T extends string>(label: string, options: readonly SelectOption<T>[], value: T, onChange: (v: T) => void): HTMLSelectElement | null;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export const STOPPED = Symbol('stage disposed');

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'lf-wrap lf-card' : 'lf-wrap lf-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'lf-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'lf-scene';
  const box = document.createElement('div');
  box.className = 'lf-map';
  if (!preview) box.style.height = `${opts.height ?? 420}px`;
  root.append(box);
  const caption = document.createElement('div');
  caption.className = 'lf-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'lf-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const owned: { remove(): unknown }[] = [];
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    box,
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    own(thing) {
      owned.push(thing);
      return thing;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    log(title, keep = 14) {
      const pre = stage.side(title);
      const lines: string[] = [];
      return (line) => {
        if (stage.disposed) return;
        if (!pre) {
          stage.say(line);
          return;
        }
        lines.push(line);
        if (lines.length > keep) lines.shift();
        pre.textContent = lines.join('\n');
      };
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      intervals.add(id);
    },
    after(ms, fn) {
      if (stage.disposed) return;
      const id = setTimeout(() => {
        timers.delete(id);
        if (!stage.disposed) fn();
      }, ms);
      timers.add(id);
    },
    wait(ms) {
      return new Promise<void>((resolve, reject) => {
        if (stage.disposed) {
          reject(STOPPED);
          return;
        }
        const id = setTimeout(() => {
          timers.delete(id);
          waiters.delete(reject);
          resolve();
        }, ms);
        timers.add(id);
        waiters.add(reject);
      });
    },
    cycle(steps, hold = 2600) {
      const play = async (): Promise<void> => {
        for (;;) {
          for (const step of steps) {
            if (step.say !== undefined) stage.say(step.say);
            await step.run();
            await stage.wait(step.hold ?? hold);
          }
        }
      };
      play().catch((err: unknown) => {
        if (err === STOPPED || stage.disposed) return;
        console.error('Leaflet cycle failed', err);
        stage.say(`Stopped: ${err instanceof Error ? err.message : String(err)}`, 'bad');
      });
    },
    side(title) {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'lf-side';
      if (title) {
        const h = document.createElement('div');
        h.className = 'lf-side-title';
        h.textContent = title;
        panel.append(h);
      }
      const pre = document.createElement('pre');
      panel.append(pre);
      root.append(panel);
      return pre;
    },
    button: (label, onClick) => (bar ? addButton(bar, label, onClick, abort.signal) : null),
    slider: (label, min, max, step, value, onInput) =>
      bar ? addSlider(bar, label, min, max, step, value, onInput, abort.signal) : null,
    toggle: (label, checked, onChange) => (bar ? addToggle(bar, label, checked, onChange, abort.signal) : null),
    select: (label, options, value, onChange) =>
      bar ? addSelect(bar, label, options, value, onChange, abort.signal) : null,
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      for (const id of timers) clearTimeout(id);
      for (const id of intervals) clearInterval(id);
      for (const reject of waiters) reject(STOPPED);
      timers.clear();
      intervals.clear();
      waiters.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('Leaflet stage cleanup failed', err);
        }
      }
      for (const thing of owned.reverse()) {
        try {
          thing.remove();
        } catch (err) {
          console.error('Leaflet remove() failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
