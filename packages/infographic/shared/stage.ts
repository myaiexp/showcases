// Shared Infographic stage: box, caption, controls, step cycle and cleanup
//
// Traps found while building the gallery (add to this list):
// - Every registered font is <link>ed into <head> on every render, and the five built-in fonts
//   live on a CDN. shared/fonts.ts re-registers them with no URLs and adds bundled stand-ins
//   under the same family names (Inter, Lora, Kalam, Caveat), loaded before the first render.
// - An icon or illus keyword with no data:/svg payload goes to the registered resource loader;
//   anything the loader leaves null (or throws on) goes to the online icon search
//   (weavefox.cn). shared/setup.ts registers offlineResource, which never returns null.
//   Never write `ref:search:` or a `ref:remote:` URL off the page: both always fetch.
// - registerResourceLoader replaces the one page-wide loader, so every card on the page uses
//   the last one registered. An example that registers its own ends it with
//   `?? offlineResource(config)` and calls installOfflineLoader() on cleanup.
// - Registries are page-wide too (registerTemplate / Theme / Palette / Pattern / Structure /
//   Item / Font): register under prefixed names (`showcase-…`) and leave them registered.
// - Errors do not throw: render() and update() emit 'error' (SyntaxError[] or Error) and
//   'warning' (SyntaxError[]). stage.own() shows them in the caption.
// - destroy() removes the SVG and the editor, and drops every listener.
// - Text is measured at render time with canvas measureText, so fonts must be loaded first
//   (createStage awaits it); a font registered later only applies to later renders.
import type { Infographic } from '@antv/infographic';
import type { MountContext } from '@/types.ts';
import { infographicReady } from './setup.ts';
import './stage.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** Box height in the full view, px (default 440). Cards are always 200px. */
  height?: number;
  /** One line under the box in the full view, such as "Double-click a label to edit it". */
  hint?: string;
}

export interface Step {
  /** Caption while the step shows. */
  say?: string;
  /** Applies the step, usually one render() or update() call. */
  run: () => unknown;
  /** How long the step stays, ms. */
  hold?: number;
}

export interface Stage {
  /** Pass as `container`: the infographic's SVG fills it. */
  box: HTMLElement;
  /** Row the box sits in; side panels are appended here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the box, or null in a card. */
  bar: HTMLElement | null;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Destroys `ig` on cleanup and shows its 'error' and 'warning' events in the caption. */
  own<T extends Infographic>(ig: T): T;
  say(text: string, tone?: Tone): void;
  /** Runs `steps` in order, holding each, and loops for ever (full view: with a pause button). */
  cycle(steps: readonly Step[], hold?: number): void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects with STOPPED once the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** A titled text panel beside the box (full view only), or null in a card. */
  side(title?: string): HTMLPreElement | null;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  /** A labelled <select> in the bar (full view only); calls `onChange` with the picked value. */
  select(label: string, options: readonly string[], value: string, onChange: (v: string) => void): HTMLSelectElement | null;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export const STOPPED = Symbol('stage disposed');

const describe = (payload: unknown): string => {
  const list = Array.isArray(payload) ? payload : [payload];
  return list
    .map((e) => {
      if (e instanceof Error) return e.message;
      const s = e as { message?: string; line?: number; path?: string };
      return [s.line ? `line ${s.line}` : '', s.path ?? '', s.message ?? String(e)].filter(Boolean).join(' · ');
    })
    .join('; ');
};

export async function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Promise<Stage> {
  const { preview } = ctx;
  await infographicReady();
  const wrap = document.createElement('div');
  wrap.className = preview ? 'ig-wrap ig-card' : 'ig-wrap ig-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'ig-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'ig-scene';
  const box = document.createElement('div');
  box.className = 'ig-box';
  if (!preview) box.style.height = `${opts.height ?? 440}px`;
  root.append(box);
  const caption = document.createElement('div');
  caption.className = 'ig-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'ig-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const owned: Infographic[] = [];
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
    own(ig) {
      owned.push(ig);
      ig.on('error', (e: unknown) => stage.say(`Error: ${describe(e)}`, 'bad'));
      ig.on('warning', (w: unknown) => stage.say(`Warning: ${describe(w)}`, 'warn'));
      return ig;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    cycle(steps, hold) {
      const pause = hold ?? (preview ? 1800 : 2600);
      let paused = false;
      const toggle = stage.button('Pause', () => {
        paused = !paused;
        if (toggle) toggle.textContent = paused ? 'Play' : 'Pause';
      });
      void (async () => {
        for (let i = 0; !stage.disposed; i = (i + 1) % steps.length) {
          const step = steps[i] as Step;
          if (step.say) stage.say(step.say);
          await step.run();
          await stage.wait(step.hold ?? pause);
          while (paused) await stage.wait(200);
        }
      })().catch((err: unknown) => {
        if (err === STOPPED || stage.disposed) return;
        console.error('infographic cycle failed', err);
        stage.say(`Stopped: ${err instanceof Error ? err.message : String(err)}`, 'bad');
      });
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
    side(title) {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'ig-side';
      if (title) {
        const h = document.createElement('div');
        h.className = 'ig-side-title';
        h.textContent = title;
        panel.append(h);
      }
      const pre = document.createElement('pre');
      panel.append(pre);
      root.append(panel);
      return pre;
    },
    button(label, onClick) {
      if (!bar) return null;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', onClick, { signal: abort.signal });
      bar.append(b);
      return b;
    },
    select(label, options, value, onChange) {
      if (!bar) return null;
      const wrapLabel = document.createElement('label');
      wrapLabel.textContent = label;
      const sel = document.createElement('select');
      for (const o of options) sel.add(new Option(o, o, false, o === value));
      sel.addEventListener('change', () => onChange(sel.value), { signal: abort.signal });
      wrapLabel.append(sel);
      bar.append(wrapLabel);
      return sel;
    },
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
          console.error('infographic stage cleanup failed', err);
        }
      }
      for (const ig of owned) {
        try {
          ig.destroy();
        } catch (err) {
          console.error('infographic destroy failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
