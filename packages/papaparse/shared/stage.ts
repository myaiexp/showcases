// Shared Papa Parse stage: scene, caption, control bar, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - Papa.parse(string) is synchronous and returns the results; Papa.parse(File | url) and
//   any parse with `worker: true` return nothing and deliver through `complete`. Every
//   async callback can land after the card unmounted: check `stage.disposed` first, or
//   route the work through `stage.play` / `stage.after`, which stop on dispose.
// - `step` and `chunk` stream: `complete` then gets no rows. Streaming parses keep going
//   after unmount unless the example calls `parser.abort()` (keep the parser from the
//   callback's second argument and abort it in `stage.onDispose`).
// - Papa.LocalChunkSize, RemoteChunkSize and DefaultDelimiter are page-wide. Set one,
//   call Papa.parse in the same synchronous block, and put the old value back. The
//   streamer reads chunkSize when it is built, so later chunks keep the value you set.
// - `download: true` uses XMLHttpRequest. Cards must not touch the network, so remote
//   examples serve their CSV from `shared/fake-server.ts` (https://data.example/...),
//   which answers in memory and logs each request. A worker parse downloads inside the
//   worker, where the fake server does not reach: never combine `worker` and `download`.
// - `worker: true` builds its worker from a Blob of the library's own source, so it
//   works from the Vite bundle with no worker file. Pause and resume do not exist there.
// - A textarea normalises \r\n to \n, so examples about line endings use read-only views.
// - The page font is monospace at ~8px per character in a 280px card: keep card CSV short.
import type { MountContext } from '@/types.ts';
import './papa.css';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Edit the CSV". */
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
  /** Runs `script` over and over until dispose. */
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
  wrap.className = preview ? 'pp-wrap pp-card' : 'pp-wrap pp-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'pp-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'pp-scene';
  const caption = document.createElement('div');
  caption.className = 'pp-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'pp-hint';
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
        if (err !== STOPPED && !stage.disposed) console.error('papaparse stage script failed', err);
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
          console.error('papaparse stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
