// Shared Wretch stage: scene, caption, control bar, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - No example touches the network. Every wretch instance gets `.fetchPolyfill(server.fetch)`
//   from `shared/server.ts`, an in-memory server at https://api.example. Write it in the
//   example's own chain (it is a documented feature) so the reader sees where answers come from.
// - An http error with no catcher rejects the promise. Unhandled, it lands in the console of
//   every card loop: end every chain you do not catch with `.catch(...)` or a catcher.
// - Requests still in flight when the card unmounts reject with an AbortError (the server
//   aborts them on dispose). Check `stage.disposed` before touching the DOM after an await.
// - Middlewares may hand the fetch a Request object as its options (the progress addon does):
//   `server.fetch` reads method, headers and body from either shape.
// - Middleware instances (dedupe, throttlingCache) keep their state in a closure. Build them
//   inside mount, never at module level, or two cards share one cache.
// - README § Chaining writes `.json({...}).post("/users")` and `.query(...)` without the addon. In 3.0.9
//   `.post(body, url)` takes the body first, so `.post("/users")` sends the string "/users" as the body
//   and the request goes to the base URL; and `.query()` needs QueryStringAddon. Put the path in
//   `wretch(url)` or pass `.post(body, "/users")`.
// - `.toFetch()` ends in `.res()`: a catcher that returns nothing makes the fetch-like function resolve
//   with `undefined`, so code that expects a Response breaks. Return `error.response` from the catcher.
// - `.resolve(r => r.json())` makes every call resolve as `unknown`: cast the result at the call site.
// - The perfs addon reads Performance entries named after the request URL, which an in-memory
//   answer never creates. `server` writes a `performance.measure` under that name, so `.perfs()`
//   fires. perfs calls `performance.clearResourceTimings()`, which is page-wide.
// - An object body with a non-JSON Content-Type set first (`.content('text/plain').post({…})`) is
//   not stringified by wretch (core.ts `fetch`): fetch gets the object and writes "[object Object]".
//   `server` shows exactly that as a text body. Options like `cache` or a `context` object never
//   become headers: read them from `req.init`.
import type { MountContext } from '@/types.ts';
import './wretch.css';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Pick what the server answers". */
  hint?: string;
}

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface Stage {
  /** The scene: append the example's panes here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  /** Fires when the stage is disposed. */
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Sets the plain-English line under the scene. */
  say(text: string, tone?: Tone): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects (ending a `play` script) when the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Runs `script` over and over until dispose. Cards loop with it; a full view runs its steps once. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /**
   * Shows `items` one by one: in a card every `ms` for ever, in the full view once (the
   * first item) unless `loop` is set. Returns a function that shows item `i`.
   */
  cycle<T>(items: readonly T[], ms: number, show: (item: T, i: number) => void, loop?: boolean): (i: number) => void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

const STOPPED = Symbol('stage disposed');

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'wr-wrap wr-card' : 'wr-wrap wr-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'wr-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'wr-scene';
  const caption = document.createElement('div');
  caption.className = 'wr-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'wr-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
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
    play(script) {
      const run = async (): Promise<void> => {
        while (!stage.disposed) await script(stage.wait);
      };
      run().catch((err: unknown) => {
        if (err !== STOPPED && !stage.disposed) console.error('wretch stage script failed', err);
      });
    },
    cycle(items, ms, show, loop = preview) {
      let i = 0;
      const at = (n: number): void => {
        i = ((n % items.length) + items.length) % items.length;
        show(items[i]!, i);
      };
      at(0);
      if (loop && items.length > 1) stage.every(ms, () => at(i + 1));
      return at;
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
          console.error('wretch stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
