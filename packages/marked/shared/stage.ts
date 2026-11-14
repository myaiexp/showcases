// Shared Marked stage: scene box, control bar, card timers and one cleanup
//
// Traps found while building the gallery (add to this list):
// - Never call `marked.use()` or `marked.setOptions()` on the global `marked`: every example
//   shares it, so one example's renderer would restyle every other card. The docs' fix is an
//   instance: `new Marked(...)` (USING_ADVANCED § Marked instance). Build it inside mount(),
//   because mount runs again on every remount and `use()` on a long-lived instance stacks
//   extensions (USING_PRO § marked.use warns about exactly that).
// - Rendered links must not navigate: an `href="#x"` changes the gallery's hash route.
//   `doc.show()` (shared/panes.ts) cancels link clicks, scrolls to in-document anchors and
//   flashes the target instead. Examples that put HTML on the page themselves do the same.
// - Cards fetch nothing: images in sample Markdown are data URLs from shared/images.ts, and
//   the Async examples "fetch" blob: URLs made in code, never the network. Put HTML on the
//   page with `doc.show()` or `putHtml()` (shared/panes.ts): they parse it in an inert
//   <template> and swap any non-data image URL (the docs' `<img src="x">`) for a local picture.
// - `marked.parse()` is typed `string | Promise<string>`. Pass `{ async: false }` (or use an
//   instance without async extensions) and the overloads return `string`.
// - Renderer overrides get `this` bound to the Renderer, so `this.parser.parseInline(tokens)`
//   works only in a `function` or method, never in an arrow function.
// - Tokenizer and renderer overrides: return `false` to fall back to the built-in one; return
//   `undefined` (nothing) and the built-in is skipped too, which switches a syntax off.
// - The page font is monospace; a card is about 284px wide, so a split card has ~16 characters
//   per pane line. Keep card samples short and line-broken by hand.
import type { MountContext } from '@/types.ts';

export const STOPPED = Symbol('stopped');

export interface StageOptions {
  /** Height of the full view's scene in px. Cards are always 200px tall. */
  height?: number;
  /** One line under the scene in the full view, such as "Edit the Markdown". */
  hint?: string;
}

export interface Stage {
  /** The scene box: examples append their panes here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar under the scene, or null in a card. */
  bar: HTMLElement | null;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Runs `script` over and over until dispose; `wait` rejects once the stage is gone. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /** Resolves after `ms`; rejects (stopping a `play` script) when the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Adds a listener that is removed on dispose. */
  listen<K extends keyof HTMLElementEventMap>(
    target: HTMLElement | Window | Document,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
  ): void;
  onDispose(fn: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const outer = document.createElement('div');
  outer.className = 'mk-outer';
  el.append(outer);

  const root = document.createElement('div');
  root.className = preview ? 'mk-scene mk-card' : 'mk-scene';
  if (preview) root.style.height = '200px';
  else if (opts.height) root.style.minHeight = `${opts.height}px`;
  outer.append(root);

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'mk-hint';
    hint.textContent = opts.hint;
    outer.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.className = 'mk-bar';
    outer.append(bar);
  }

  const timers = new Set<number>();
  const disposers: (() => void)[] = [];
  const waiters = new Set<() => void>();
  let disposed = false;

  const wait = (ms: number): Promise<void> =>
    new Promise((resolve, reject) => {
      if (disposed) return reject(STOPPED);
      const stop = (): void => reject(STOPPED);
      waiters.add(stop);
      const t = window.setTimeout(() => {
        timers.delete(t);
        waiters.delete(stop);
        resolve();
      }, ms);
      timers.add(t);
    });

  const stage: Stage = {
    root,
    preview,
    bar,
    every(ms, fn) {
      timers.add(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    },
    play(script) {
      const run = async (): Promise<void> => {
        while (!disposed) await script(wait);
      };
      run().catch((err: unknown) => {
        if (err !== STOPPED) throw err;
      });
    },
    wait,
    listen(target, type, fn) {
      const handler = fn as EventListener;
      target.addEventListener(type, handler);
      disposers.push(() => target.removeEventListener(type, handler));
    },
    onDispose(fn) {
      disposers.push(fn);
    },
    get disposed() {
      return disposed;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const t of timers) {
        clearTimeout(t);
        clearInterval(t);
      }
      for (const stop of waiters) stop();
      for (const fn of disposers.splice(0).reverse()) fn();
      outer.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
