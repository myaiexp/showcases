// Hooks scene: stage, pretend server, wire, hook lane, panels and a run loop
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { hookLane, type HookLane } from './hook-lane.ts';
import { logView, requestView, resultView, type RequestViewOptions, type Tone } from './panels.ts';
import { demo, serial, type Demo, type DemoOptions } from './req-kit.ts';
import type { Seen } from './server.ts';
import { pathOf } from './wire.ts';

export interface Scene extends Demo {
  lane: HookLane;
  /** The server's latest arrival, as the server saw it. */
  seen(title?: string, opts?: RequestViewOptions): ReturnType<typeof requestView>;
  result(title?: string): ReturnType<typeof resultView>;
  /** Like `result`, but cards get a silent stand-in: they have no room for a third panel. */
  fullResult(title?: string): ReturnType<typeof resultView>;
  /** One line per answer: which try, what status, and optionally one request header, or `show(req)`. */
  trail(title?: string, show?: string | ((req: Seen) => string)): ReturnType<typeof logView>;
  /** Forgets the last run: picture, counts, panels. */
  reset(): void;
  /**
   * Cards loop `run`; the full view gets a button (and runs once at once). Runs never overlap.
   * Returns a function that queues one more run (a control calls it when its value changes).
   */
  go(run: () => Promise<void>, o?: { pause?: number; label?: string }): () => void;
}

/** The server answers fast here (200 ms a trip) so hook cards stay lively. */
export function hookScene(el: HTMLElement, ctx: MountContext, opts: DemoOptions): Scene {
  const d = demo(el, ctx, { ...opts, server: { latency: 100, delay: 80, ...opts.server } });
  const { stage, server } = d;
  const lane = hookLane(stage.root);
  stage.onDispose(lane.dispose);
  let row: HTMLElement | null = null;
  const resets: (() => void)[] = [];
  const inRow = (): HTMLElement => (row ??= stage.row());

  const scene: Scene = {
    ...d,
    lane,
    seen(title = 'Server received', o = {}) {
      const v = requestView(inRow(), title, o);
      server.on((e) => e.kind === 'arrive' && v.show(e.req));
      resets.push(() => v.show(null));
      return v;
    },
    result(title = 'Your code got') {
      const v = resultView(inRow(), title);
      resets.push(() => v.clear());
      return v;
    },
    fullResult(title) {
      if (!stage.preview) return scene.result(title);
      const quiet = (): void => undefined;
      return { pending: quiet, value: quiet, error: quiet, clear: quiet } as unknown as ReturnType<typeof resultView>;
    },
    trail(title = 'Answers', show) {
      const v = logView(inRow(), title, stage.preview ? 3 : 6);
      const tone = (s: number): Tone => (s < 300 ? 'ok' : s < 500 ? 'warn' : 'bad');
      server.on((e) => {
        if (e.kind === 'reply') {
          const extra = typeof show === 'string' ? `  ${show}: ${e.req.headers.get(show) ?? '-'}` : '';
          const what = typeof show === 'function' ? show(e.req) : pathOf(e.req.url);
          v.add(`${server.requests.indexOf(e.req) + 1}. ${what} ${e.status}${extra}`, tone(e.status));
        }
        if (e.kind === 'drop') v.add(`${server.requests.indexOf(e.req) + 1}. ${pathOf(e.req.url)} lost`, 'bad');
      });
      resets.push(() => v.clear());
      return v;
    },
    reset() {
      server.reset();
      lane.reset();
      for (const r of resets) r();
    },
    go(run, o = {}) {
      const once = async (): Promise<void> => {
        scene.reset();
        await run();
      };
      if (stage.preview) {
        stage.play(async (wait) => {
          await once();
          await wait(o.pause ?? 1600);
        });
        return () => undefined;
      }
      const queue = serial(stage);
      const again = (): void => queue(once);
      button(stage.bar!, o.label ?? 'Run', again);
      again();
      return again;
    },
  };
  return scene;
}
