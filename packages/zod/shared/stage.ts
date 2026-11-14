// Shared Zod stage: scene, caption, control bar, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - z.config() writes one page-wide object (globalThis.__zod_globalConfig) that every card's
//   parse reads. Call it inside shared/error-config.ts keepConfig(), which restores the old
//   config, and read the messages there with settle(): Zod builds a message when
//   result.error is first read, so a message read after the restore uses the page's config.
//   Never hold a config across a timer or an await. Per-parse { error } is captured: safe.
// - Message precedence, lowest to highest: locale, global customError, per-parse error,
//   schema-level error, check-level error.
// - A z.treeifyError items array is sparse (passing elements are holes). z.flattenError files
//   nested errors under the first path key only (user.name and user.email share "user").
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
// - Plain .extend() that overwrites a key on a refined object throws ("Use .safeExtend()");
//   .partial() and z.deepPartial() throw on a refined object too. .safeExtend's refusal of an
//   incompatible key is type-only: at runtime it is accepted.
// - Cyclic input parses into a new object with the same loop; deep recursion (~2000 levels)
//   overflows the stack. .required() reports "expected nonoptional, received undefined".
// - Cards mount slowly in a loaded headless browser: scroll a card into view and wait
//   several seconds before calling it "not mounted".
// - Plain z.union of objects already narrows by a matching literal; it differs from
//   z.discriminatedUnion only for an unknown or missing kind ("Invalid discriminator value").
// - z.xor with two matches: errors [] and matches [i, j], "more than one option matched".
// - z.set: a bad member's issue has path [], so it cannot be pinned. z.map paths use the key.
// - z.properties() returns an array of checks: spread it into .check(...).
// - z.instanceof(Date) accepts an Invalid Date; z.date() rejects it.
// - An over-long array reports only too_big, not its elements' issues.
// - An object refine is skipped only after a type error in a field, not after any issue
//   (the docs say any): a too-short password still lets the match check run.
// - .check() without continue: true skips only the checks after it. z.coerce.number()
//   turns "" into 0. z.date().min() words its message in epoch milliseconds.
// - z.string().pipe(z.coerce.number()) fails to type-check: write z.coerce.number<string>().
// - safeParse on an async transform or refine throws "Encountered Promise during
//   synchronous parse"; use safeParseAsync.
// - objectLab: a card plan with one entry never cycles; list every [variant, sample] pair.
// - .readonly() freezes the top object only (docs: Object.freeze): nested arrays still push.
// - .default({}) on an object is not parsed, so inner defaults stay unfilled; .prefault({})
//   fills them. .default() fires only for undefined, never null or "".
// - z.json() failures have an empty path and say only "Invalid input" (it is a union).
// - Registries: a duplicate id is accepted silently (the later schema wins); conversion
//   throws "Duplicate schema id" only when both schemas are converted together.
// - Metadata is inherited by same-kind copies (.refine, .min, .meta) but not by wrappers
//   (.optional, .default, .transform, z.array, .extend, .pick): the docs say otherwise.
// - toJSONSchema: looseObject gives additionalProperties: {}; fromJSONSchema objects keep
//   extra keys when additionalProperties is unset, so a round trip turns strict into loose.
// - A card fits about 10 lines of JSON.
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
