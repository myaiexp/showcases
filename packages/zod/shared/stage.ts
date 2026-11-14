// Shared Zod stage: scene, caption, control bar, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - z.config() writes one page-wide object (globalThis.__zod_globalConfig) that every card's
//   parse reads. An example that calls it sets it, parses and restores it in one synchronous
//   try/finally, never across a timer or an await, so no other card parses under its config.
// - z.globalRegistry is page-wide too. A schema given .meta({ id }) or .register(z.globalRegistry)
//   inside mount() is registered again on every remount, and z.toJSONSchema(z.globalRegistry)
//   lists every example's schemas. Prefer z.registry() per mount; otherwise remove the schema
//   from the global registry on cleanup (stage.onDispose).
// - Cards never touch the network: z.url(), z.email() and friends only check the text, which
//   is fine, but an async refine that "checks a server" fakes the server with stage.wait().
// - An example's style.css loads only when its main.ts imports it (import './style.css').
// - A card fits about 7 sampleRows rows; an eighth is clipped.
// - z.templateLiteral checks the text shape only: an inner z.number().int() is reflected
//   (user-1.5 fails) but .positive()/.min()/.max() are not (user-0 passes).
// - z.coerce.date() turns null and true into 1970-01-01; z.coerce.bigint() turns "" into 0n
//   and "0x1f" into 31n; z.coerce.string() never fails. z.void() rejects null.
// - z.url() accepts javascript: and ftp: links; z.httpUrl() rejects localhost and bare IPs.
//   z.url({ normalize: true }) returns new URL(x).href (a trailing slash appears).
// - z.jwt() checks the shape and header alg only, never the signature.
// - z.date() on an Invalid Date says "expected date, received Date". z.enum() is
//   case-sensitive ("m" fails against "M"). z.any()/z.unknown() as an object key still
//   need the key: missing fails with "expected nonoptional, received undefined".
// - multipleOf(0.05) is float-safe: 0.1 + 0.2 passes.
// - Matrix columns are ~60px in a card: draw only ✓/✗ there, with short column titles.
// - For caxi checks of the gallery, scroll to the bottom first: sections render progressively.
import type { MountContext } from '@/types.ts';
import './zod.css';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Edit the JSON". */
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
  wrap.className = preview ? 'zd-wrap zd-card' : 'zd-wrap zd-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'zd-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'zd-scene';
  const caption = document.createElement('div');
  caption.className = 'zd-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'zd-hint';
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
        if (err !== STOPPED && !stage.disposed) console.error('zod stage script failed', err);
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
          console.error('zod stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
