// Middleware scene: server, timeline and the run helpers timing examples share
import type { MountContext } from '@/types.ts';
import { type Pane } from './pane.ts';
import { columns, screen, type Screen } from './screen.ts';
import type { Tone } from './wire.ts';
import { createServer, type Routes, type Server } from './server.ts';
import { createStage, type Stage } from './stage.ts';
import { timeline, type Timeline } from './timeline.ts';

export interface MwSceneOptions {
  hint: string;
  routes: Routes;
  /** Milliseconds the timeline axis shows at first. */
  span?: number;
  /** Answer time for both card and full view. */
  latency?: number;
}

export interface MwScene {
  stage: Stage;
  server: Server;
  tl: Timeline;
}

/** A stage with an in-memory server and a timeline above whatever panes the example adds. */
export function mwScene(el: HTMLElement, ctx: MountContext, opts: MwSceneOptions): MwScene {
  const stage = createStage(el, ctx, { hint: opts.hint });
  const server = createServer(stage, opts.routes, { latency: opts.latency });
  const tl = timeline(stage, server, { span: opts.span });
  return { stage, server, tl };
}

/** Wraps a run so a second click while it is still going does nothing. */
export function solo<A extends unknown[]>(fn: (...args: A) => Promise<unknown>): (...args: A) => Promise<void> {
  let busy = false;
  return async (...args) => {
    if (busy) return;
    busy = true;
    try {
      await fn(...args);
    } finally {
      busy = false;
    }
  };
}

/** Calls `fn(waited, n)` for every request after the first with how long the middleware held it back. */
export function onWaits(server: Server, fn: (waited: number, n: number) => void): void {
  let lastEnd: number | null = null;
  server.on((e) => {
    if (e.type !== 'request') {
      lastEnd = server.now();
      return;
    }
    if (e.req.id === 1) lastEnd = null;
    if (lastEnd !== null) fn(Math.round(e.req.at - lastEnd), e.req.id);
  });
}

/** `n` side by side screens, one per caller in the app. */
export function callers(stage: Stage, n: number): Screen[] {
  return columns(stage.root, n).map((col, i) => screen(col, `call ${i + 1}`, '…'));
}

/**
 * Starts `n` calls `gap` ms apart without waiting for each, marks each on the timeline
 * (just the number in a card) and resolves when all are done. `call` must catch its own errors.
 */
export async function volley(stage: Stage, tl: Timeline, n: number, gap: number, call: (i: number) => Promise<unknown>): Promise<void> {
  const running: Promise<unknown>[] = [];
  for (let i = 0; i < n; i++) {
    tl.mark(stage.preview ? String(i + 1) : `call ${i + 1}`);
    running.push(call(i).catch(() => {}));
    if (i < n - 1) await stage.wait(gap);
  }
  await Promise.all(running);
}

/** True when the response came out of the throttling cache under the flag name `flag`. */
export const cameFromCache = (res: Response, flag = '__cached'): boolean => flag in res;

/** Adds lines to `out`, dropping the oldest so a card never overflows (3 lines there, 12 in the full view). */
export function logTo(stage: Stage, out: Pane): (text: string, tone?: Tone) => void {
  const max = stage.preview ? 3 : 12;
  return (text, tone) => {
    while (out.body.childElementCount >= max) out.body.firstElementChild?.remove();
    out.add(text, tone);
  };
}
