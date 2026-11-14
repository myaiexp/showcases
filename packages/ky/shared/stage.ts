// Shared Ky stage: scene, caption, control bar, pretend server, card loop, cleanup
//
// Traps found while building the gallery (add to this list):
// - Cards must never touch the network. Every Ky call goes through a pretend server:
//   `const api = ky.extend({fetch: server.fetch})`, or `fetch: server.fetch` in ky.create().
//   ky.create() inherits nothing, so it needs the option again. A forgotten option fails
//   loudly for *.example hosts (shared/server.ts guards globalThis.fetch), so use hosts
//   like https://api.example in every URL.
// - A request in flight when the stage disposes rejects (the server's STOPPED AbortError).
//   Run requests inside `stage.task` or `stage.play`, which swallow anything thrown after
//   dispose, so an example never has to catch for cleanup's sake.
// - Ky retries GET with backoff 300, 600, 1200 ms by default and times out at 10 s. A card
//   loop that waits on a request must budget for both, or set `retry`/`timeout` itself.
// - Ky reads the body for HTTPError's `error.data`, so `error.response.json()` throws: use
//   error.data. The pretend server sets content-type for `json` and `text` replies.
// - Each exchange takes `latency` out, `delay` at the server and `latency` back (220+150+220
//   ms by default); timing examples set them on the server so the numbers are round.
// - onUploadProgress needs request streams: Firefox has none, so Ky silently skips it there.
//   Say so on screen rather than showing an empty bar.
import type { MountContext } from '@/types.ts';
import { createServer, STOPPED as SERVER_STOPPED, type Handler, type Server, type ServerOptions } from './server.ts';
import { wire, type Wire, type WireOptions } from './wire.ts';
import './ky.css';

export interface StageOptions {
  /** One line under the scene in the full view, such as "Press Send". */
  hint?: string;
}

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface Stage {
  /** The scene: append the example's panels here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  /** Fires when the stage is disposed. */
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Sets the plain-English line under the scene. */
  say(text: string, tone?: Tone): void;
  /** A pretend server, disposed with the stage. */
  server(routes?: Record<string, Handler>, opts?: ServerOptions): Server;
  /** The page-to-server picture for `server`, at the top of the scene. */
  wire(server: Server, opts?: WireOptions): Wire;
  /** A row of side-by-side panels in the scene. */
  row(): HTMLElement;
  /** Runs `fn` now; errors after dispose are dropped, others shown in the caption. */
  task(fn: () => Promise<void>): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects (ending a `play` script) when the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Runs `script` over and over until dispose. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

const STOPPED = Symbol('stage disposed');

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'ky-wrap ky-card' : 'ky-wrap ky-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'ky-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'ky-scene';
  const caption = document.createElement('div');
  caption.className = 'ky-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'ky-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const waiters = new Set<(reason: unknown) => void>();
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  const report = (err: unknown): void => {
    if (stage.disposed || err === STOPPED || err === SERVER_STOPPED) return;
    console.error('ky example failed', err);
    stage.say(`Example error: ${err instanceof Error ? err.message : String(err)}`, 'bad');
  };

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
    server(routes, serverOpts) {
      const s = createServer(routes, serverOpts);
      cleanups.push(s.dispose);
      return s;
    },
    wire(server, wireOpts) {
      const w = wire(root, server, wireOpts);
      root.prepend(w.el);
      cleanups.push(w.dispose);
      return w;
    },
    row() {
      const r = document.createElement('div');
      r.className = 'ky-row';
      root.append(r);
      return r;
    },
    task(fn) {
      fn().catch(report);
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      cleanups.push(() => clearInterval(id));
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
      run().catch(report);
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      for (const id of timers) clearTimeout(id);
      for (const reject of waiters) reject(STOPPED);
      timers.clear();
      waiters.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('ky stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
