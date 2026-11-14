// Shared Fuse.js stage: scene, caption, control bar, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - An empty query returns every item, with no score and no matches. Show that as "no
//   search yet", not as "everything matched perfectly".
// - Scores run from 0 (perfect) to 1 (no match). With several keys, a hit in one key scores
//   worse than the same hit in a one-key instance (weights are normalised), so compare
//   scores only between results of the same Fuse instance.
// - Match `indices` are [start, end] pairs with an inclusive end: slice(start, end + 1).
//   Use shared/highlight.ts, which also handles keys that point at arrays (`refIndex`).
// - Fuse.match() returns `indices` only with `includeMatches: true`, though the README's
//   sample output shows them without it.
// - With the defaults (threshold 0.6, distance 100) a pattern must start within ~60
//   characters of `location`: words late in a long field never match without
//   `ignoreLocation` or a bigger `distance`.
// - The docs' `import { ExtendedSearch } from 'fuse.js'` (for Fuse.use with the basic
//   build) does not exist in 7.5.0: the published builds export only the default class.
// - Fuse.config is frozen, so there are no page-wide defaults an example could leak.
// - The search window is location ± threshold × distance (both sides), not only forward.
// - A pattern over 32 characters does not throw: it is cut into 32-letter pieces, and the
//   score averages the pieces (a failed piece counts as 1).
// - findAllMatches changes scores, not the highlighted indices, in 7.5.0.
// - threshold 1.0 does not "match anything": a word with every letter wrong still fails.
// - A field's score includes the field-length norm, so it is not the bitap score that
//   `threshold` is compared against. Relate scores to threshold with single-word items or
//   `ignoreFieldNorm`.
// - Fuse.match: an edit at the first or last letter can score as a perfect hit, since the
//   rest of the word is still found intact inside the text.
// - An array of BigInts is not searched as a string list; BigInt works as a field of objects.
// - With includeScore, an empty query still returns every item, without a score.
// - FuseWorker.terminate() rejects searches still in flight ("FuseWorker terminated"):
//   ignore that rejection when the example is the one that terminated it.
// - fuse.add() pushes into the array passed to the constructor or setCollection: copy the
//   array first if the example reuses it.
// - A one- or two-letter query word fuzzy-matches many unrelated words: raise
//   minMatchCharLength or the threshold in token and fuzzy examples alike.
// - tokenize as a regex without the g flag only shortens the query (to its first token);
//   fields are still matched whole. Fuse logs a one-time console.warn in dev builds.
// - Extended search: the docs' "'^hello world" reads as include '^hello' AND fuzzy 'world'
//   (matches nothing); a phrase needs quotes ('"hello world"). A query mixing a positive
//   term with a ! term over several keys returns nothing. Patterns are lowercased.
// - Logical: $or does not short-circuit in 7.5.0 (the docs say it does). A bare
//   { $path, $val } as the whole query throws; wrap it in $and or $or. Two clauses on the
//   same key in one object literal keep only the last: that is why $and exists.
// - fuse.remove() replaces Fuse's internal array (the one passed in stops mirroring it);
//   removeAt shifts every later refIndex and throws "Invalid doc index" out of range.
// - Plain Fuse on a big list blocks the page: cards keep lists small (a few thousand items)
//   and never time main-thread work on 10,000+ items.
import type { MountContext } from '@/types.ts';
import './fuse.css';

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
  wrap.className = preview ? 'fz-wrap fz-card' : 'fz-wrap fz-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'fz-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'fz-scene';
  const caption = document.createElement('div');
  caption.className = 'fz-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'fz-hint';
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
        if (err !== STOPPED && !stage.disposed) console.error('fuse stage script failed', err);
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
          console.error('fuse stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
