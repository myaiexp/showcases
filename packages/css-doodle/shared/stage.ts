// Shared css-doodle stage: scene, caption, control bar, sized doodles, card loops
//
// Traps found while building the gallery (add to this list):
// - The docs size doodles with `60vmin`, which would fill the whole page in a full view and
//   overflow a 200px card. Examples write `@grid: N / 100%` (or `100% auto` for a grid that
//   is not square) and `stage.doodle()` puts the element in a frame of a fixed size.
// - A doodle reads its code once, when it connects. `stage.doodle()` sets the code as text
//   before appending; after that only `update(code)` changes it (stage.setCode keeps the
//   editor in step).
// - Warnings fire as bubbling `warn` events, the first ones while the element connects. The
//   stage listens on its wrapper before appending, shows them under the editor and calls
//   preventDefault so they stay out of the console.
// - With prefers-reduced-motion css-doodle pauses its animations and skips auto:update ticks
//   (unless ignore-reduced-motion). The full view says so.
// - @shaders, @pattern and @scene draw with WebGL2 (`failIfMajorPerformanceCaveat`), sharing one
//   context per raster size, and stop when the doodle disconnects.
// - `@use: <addon>` loads the addon from a CDN unless it is already on the page: import
//   '@css-doodle/addons/<name>' first (the addons README documents this), so nothing fetches.
//   Addons and CSSDoodle.use() register page-wide: use unique names and leave them.
// - @google-font fetches from Google Fonts: full views only, never in cards.
// - A card is a link, so a scripted click() inside it would open the example. The stage stops
//   clicks at its wrapper in cards; the doodle's own click handlers still run.
// - Page CSS on the frame sets the host's width and height and beats a size in the doodle
//   code. Examples about a size use `frame: 'free'` (and a px size) or a box of their own.
// - Rules stored in a custom property (for `use` / `@use`) need parentheses around them to
//   be a valid custom property value: `--rule: (background: red; scale: .5;)`.
import 'css-doodle';
import type { MountContext } from '@/types.ts';
import { attachEditor, type Editor } from './editor.ts';
import type { CSSDoodle } from './types.ts';
import './doodle.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Click a cell". */
  hint?: string;
}

export interface DoodleOptions {
  /** Attributes to set on the element before it connects, such as { seed: 'abc' }. */
  attrs?: Record<string, string>;
  /** Frame shape: 'square' (default), 'wide' (16:9), or 'free' (no fixed size). */
  frame?: 'square' | 'wide' | 'free';
  /** Show the live code editor in the full view. Default: true for the first doodle. */
  editor?: boolean;
  /** Where to append the frame; the scene by default. */
  parent?: HTMLElement;
  /** Label under the frame, for examples that put doodles side by side. */
  label?: string;
}

export interface Stage {
  /** The scene: doodle frames go here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Makes a <css-doodle> with `code` (dedented), in a sized frame, and returns it. */
  doodle(code: string, opts?: DoodleOptions): CSSDoodle;
  /** Replaces a doodle's code: `update(code)`, plus the editor text when it has one. */
  setCode(doodle: CSSDoodle, code: string): void;
  /**
   * Re-renders with a new seed: in a card every `ms`, in the full view from a "New seed"
   * button. The doodle's own `transition` animates between renders.
   */
  reroll(doodle: CSSDoodle, ms?: number): void;
  /**
   * Code variants of one doodle: a card cycles them every `ms`, the full view gets a button
   * per variant. Returns a function that shows variant `i`.
   */
  variants(doodle: CSSDoodle, items: readonly { label: string; code: string }[], ms?: number): (i: number) => void;
  /** Sets the plain-English line under the scene. */
  say(text: string, tone?: Tone): void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects (ending a `play` script) once the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Runs `script` over and over until dispose. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /** Calls `fn` every animation frame with seconds since the stage started. */
  frame(fn: (t: number) => void): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

const STOPPED = Symbol('stage disposed');

/** Strips the common indentation and the blank first and last lines of a template string. */
export function dedent(code: string): string {
  const lines = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '').split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => /^ */.exec(l)![0].length));
  return lines.map((l) => l.slice(Number.isFinite(indent) ? indent : 0)).join('\n');
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'cd-wrap cd-card' : 'cd-wrap cd-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'cd-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'cd-scene';
  const caption = document.createElement('div');
  caption.className = 'cd-caption';
  wrap.append(root, caption);
  const notes = document.createElement('div');
  notes.className = 'cd-notes';
  if (!preview) {
    if (opts.hint) {
      const hint = document.createElement('div');
      hint.className = 'cd-hint';
      hint.textContent = opts.hint;
      notes.append(hint);
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rm = document.createElement('div');
      rm.className = 'cd-hint';
      rm.textContent = 'Your system asks for reduced motion, so css-doodle pauses animations and skips timed updates.';
      notes.append(rm);
    }
    wrap.append(notes);
  }
  el.append(wrap);
  // A card is a link: a scripted click on a cell or doodle (click:update, click:cell) would
  // bubble to it and open the example. The doodle's own listeners have run by then.
  if (preview) {
    wrap.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const waiters = new Set<(reason: unknown) => void>();
  const frames = new Set<(t: number) => void>();
  const cleanups: (() => void)[] = [];
  const editors = new Map<CSSDoodle, Editor>();
  const doodles: CSSDoodle[] = [];
  const start = performance.now();
  let raf = 0;
  const tick = (): void => {
    raf = 0;
    if (stage.disposed) return;
    const t = (performance.now() - start) / 1000;
    for (const fn of frames) fn(t);
    raf = requestAnimationFrame(tick);
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  // Warnings bubble out of the doodle (and out of nested doodles' shadow roots).
  wrap.addEventListener('warn', (e) => {
    e.preventDefault();
    const target = e.composedPath().find((n): n is CSSDoodle => doodles.includes(n as CSSDoodle));
    const detail = (e as CustomEvent<{ message: string }>).detail;
    if (target) editors.get(target)?.warn(detail.message);
  });

  const stage: Stage = {
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    doodle(code, o = {}) {
      const frame = document.createElement('figure');
      frame.className = `cd-frame cd-${o.frame ?? 'square'}`;
      const doodle = document.createElement('css-doodle') as CSSDoodle;
      for (const [k, v] of Object.entries(o.attrs ?? {})) doodle.setAttribute(k, v);
      const text = dedent(code);
      doodle.textContent = text;
      frame.append(doodle);
      if (o.label) {
        const cap = document.createElement('figcaption');
        cap.textContent = o.label;
        frame.append(cap);
      }
      if (!preview && (o.editor ?? doodles.length === 0)) {
        editors.set(doodle, attachEditor(notes, doodle, text));
      }
      doodles.push(doodle);
      (o.parent ?? root).append(frame);
      return doodle;
    },
    setCode(doodle, code) {
      const text = dedent(code);
      editors.get(doodle)?.set(text);
      doodle.update(text);
    },
    reroll(doodle, ms = 2400) {
      if (preview) stage.every(ms, () => doodle.update());
      else if (bar) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn';
        b.textContent = 'New seed';
        b.addEventListener('click', () => doodle.update());
        bar.append(b);
      }
    },
    variants(doodle, items, ms = 2600) {
      const buttons: HTMLButtonElement[] = [];
      let i = 0;
      const show = (n: number): void => {
        i = ((n % items.length) + items.length) % items.length;
        stage.setCode(doodle, items[i]!.code);
        buttons.forEach((b, j) => b.classList.toggle('cd-on', j === i));
      };
      if (bar) {
        items.forEach((item, j) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'btn';
          b.textContent = item.label;
          b.addEventListener('click', () => show(j));
          buttons.push(b);
          bar.append(b);
        });
      }
      show(0);
      if (preview && items.length > 1) stage.every(ms, () => show(i + 1));
      return show;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      cleanups.push(() => clearInterval(id));
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
        if (stage.disposed) return reject(STOPPED);
        const id = setTimeout(() => {
          timers.delete(id);
          waiters.delete(reject);
          resolve();
        }, ms);
        timers.add(id);
        waiters.add(reject);
      });
    },
    play(script) {
      const loop = async (): Promise<void> => {
        while (!stage.disposed) await script(stage.wait);
      };
      loop().catch((err: unknown) => {
        if (err !== STOPPED && !stage.disposed) console.error('css-doodle stage script failed', err);
      });
    },
    frame(fn) {
      frames.add(fn);
      if (!raf) raf = requestAnimationFrame(tick);
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      if (raf) cancelAnimationFrame(raf);
      for (const id of timers) clearTimeout(id);
      for (const reject of waiters) reject(STOPPED);
      frames.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('css-doodle stage cleanup failed', err);
        }
      }
      // Disconnecting a doodle stops its timers, animation loops and shader surfaces.
      wrap.remove();
    },
  };
  return stage;
}
