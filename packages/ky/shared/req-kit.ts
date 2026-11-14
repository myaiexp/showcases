// Shared setup for the Requests and URLs examples: demo, attempt, cycle, notes
import ky, { type KyInstance } from 'ky';
import type { MountContext } from '@/types.ts';
import { button, select } from './controls.ts';
import { panel, type Tone } from './panels.ts';
import type { Handler, Server, ServerOptions } from './server.ts';
import { createStage, type Stage } from './stage.ts';
import type { WireOptions } from './wire.ts';

export interface Demo {
  stage: Stage;
  server: Server;
  /** Ky wired to the pretend server: every call made on it stays inside the page. */
  api: KyInstance;
}

export interface DemoOptions {
  hint?: string;
  routes?: Record<string, Handler>;
  server?: ServerOptions;
  wire?: WireOptions;
}

/** A stage with a pretend server, its wire picture and a Ky instance that talks to it. */
export function demo(el: HTMLElement, ctx: MountContext, opts: DemoOptions = {}): Demo {
  const stage = createStage(el, ctx, opts.hint ? { hint: opts.hint } : {});
  const server = stage.server(opts.routes, opts.server);
  stage.wire(server, opts.wire);
  return { stage, server, api: ky.extend({ fetch: server.fetch }) };
}

interface Result {
  pending(text?: string): void;
  value(v: unknown, note?: string): void;
  error(err: unknown, detail?: string): void;
}

export type Outcome<T> = { ok: true; value: T } | { ok: false; error: unknown };

/** Runs a Ky call and shows what your code got: the value, or the error it threw. */
export async function attempt<T>(
  stage: Stage,
  result: Result,
  call: () => Promise<T>,
  show: (v: T) => unknown = (v) => v,
  note?: string,
): Promise<Outcome<T>> {
  result.pending();
  try {
    const value = await call();
    if (stage.disposed) throw new Error('stopped');
    result.value(show(value), note);
    return { ok: true, value };
  } catch (error) {
    // A call cut off by cleanup rejects; rethrow so the card loop ends quietly.
    if (stage.disposed) throw error;
    result.error(error);
    return { ok: false, error };
  }
}

/**
 * Card: plays every item in turn, over and over. Full view: a select picks the item and
 * a button sends it again. Runs are queued, so two quick clicks never overlap.
 */
export function cycle<T extends { label: string }>(
  stage: Stage,
  items: readonly T[],
  run: (item: T) => Promise<void>,
  opts: { pause?: number; control?: string; again?: string } = {},
): void {
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const item of items) {
        await run(item);
        await wait(opts.pause ?? 1500);
      }
    });
    return;
  }
  let current = items[0]!;
  let queue: Promise<void> = Promise.resolve();
  const go = (item: T): void => {
    current = item;
    queue = queue.catch(() => undefined).then(() => run(item));
    stage.task(() => queue);
  };
  select(stage.bar!, opts.control ?? 'Try', items.map((i) => [i, i.label] as const), go);
  button(stage.bar!, opts.again ?? 'Send again', () => go(current));
  go(current);
}

/** A panel of short lines that can be rewritten; each line may carry a tone. */
export function notes(parent: HTMLElement, title: string) {
  const p = panel(parent, title);
  const api = {
    ...p,
    set(lines: readonly (string | readonly [string, Tone])[]) {
      p.body.replaceChildren();
      for (const l of lines) {
        const d = document.createElement('div');
        d.className = 'ky-header';
        const [text, tone] = typeof l === 'string' ? [l, undefined] : l;
        d.textContent = text;
        if (tone) d.dataset['tone'] = tone;
        p.body.append(d);
      }
    },
    pending(text = 'waiting…') {
      p.body.replaceChildren();
      const d = document.createElement('div');
      d.className = 'ky-dim';
      d.textContent = text;
      p.body.append(d);
    },
  };
  api.pending('nothing yet');
  return api;
}

/** Strips the host a lab talks to, so a table of URLs shows only what changes. */
export function shortUrl(url: URL, host = 'api.example'): string {
  return url.host === host ? decodeURIComponent(url.pathname + url.search) : decodeURIComponent(url.href);
}

/** Returns a function that runs the jobs it is given one after another, never overlapping. */
export function serial(stage: Stage): (job: () => Promise<void>) => void {
  let queue: Promise<void> = Promise.resolve();
  return (job) => {
    queue = queue.catch(() => undefined).then(job);
    stage.task(() => queue);
  };
}
