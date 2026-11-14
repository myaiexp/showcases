// Retry lab: stage, pretend server, wire, timeline and result in one call
import ky from 'ky';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { logView, resultView } from './panels.ts';
import type { Handler, Server, ServerOptions } from './server.ts';
import { createStage, type Stage, type Tone } from './stage.ts';
import { timeline, type Timeline } from './timeline.ts';

export interface LabOptions {
  /** Hint under the full view. */
  hint?: string;
  /** Axis width in ms, in cards (and in the full view unless `fullSpan` is set). */
  span: number;
  fullSpan?: number;
  routes: Record<string, Handler>;
  /** Defaults to 100 ms each way and 100 ms of thinking, so one exchange takes 300 ms. */
  server?: ServerOptions;
  /** Leave out the page-to-server picture (a card with other things to show). */
  noWire?: boolean;
  timelineTitle?: string;
  resultTitle?: string;
}

export interface Attempt<T> {
  /** Caption while the call runs. */
  say: string;
  call: () => Promise<T>;
  /** Caption and badge when the call returns. */
  ok: (value: T) => { say: string; badge?: string };
  /** Caption when it throws. */
  bad: (error: unknown) => string;
  /** Put a 'gave up' marker on the timeline when it throws. Default true. */
  mark?: string | false;
  badTone?: Tone;
}

export interface Lab {
  stage: Stage;
  server: Server;
  times: Timeline;
  result: ReturnType<typeof resultView>;
  /** The row under the timeline, holding the result; add more panels to it. */
  row: HTMLElement;
  /** A Ky instance that sends through the pretend server. */
  api: typeof ky;
  /** A small list panel in the row (for what the server did, what a header said). */
  facts(title: string): ReturnType<typeof logView>;
  /** The pauses between exchanges that answered at the default pace, in ms (measured). */
  gaps(): number[];
  /** Clears the picture and runs one call, showing its outcome. Resolves true on success. */
  attempt<T>(a: Attempt<T>): Promise<boolean>;
  /** Cards loop `go` with a pause; the full view gets a Run button (and runs once at once). */
  start(go: () => Promise<void>, pause?: number, label?: string): void;
  dispose(): void;
}

/** '1 retry', '3 retries'. */
export const plural = (n: number, one: string, many: string): string => `${n} ${n === 1 ? one : many}`;

export function retryLab(el: HTMLElement, ctx: MountContext, o: LabOptions): Lab {
  const stage = createStage(el, ctx, o.hint ? { hint: o.hint } : {});
  const server = stage.server(o.routes, { latency: 100, delay: 100, ...o.server });
  if (!o.noWire) stage.wire(server);
  const times = timeline(stage.root, server, stage.signal, {
    span: stage.preview ? o.span : (o.fullSpan ?? o.span),
    ...(o.timelineTitle ? { title: o.timelineTitle } : {}),
  });
  const row = stage.row();
  const result = resultView(row, o.resultTitle ?? 'Your code got');
  const api = ky.extend({ fetch: server.fetch });

  const lab: Lab = {
    stage,
    server,
    times,
    result,
    row,
    api,
    facts: (title) => logView(row, title, stage.preview ? 3 : 6),
    gaps() {
      const r = server.requests;
      return r.slice(1).map((q, i) => q.at - r[i]!.at - (2 * server.latency + server.delay));
    },
    async attempt(a) {
      server.reset();
      times.reset();
      result.pending('waiting…');
      stage.say(a.say);
      try {
        const value = await a.call();
        const { say, badge } = a.ok(value);
        result.value(value, badge);
        stage.say(say, 'ok');
        return true;
      } catch (err) {
        if (stage.disposed) return false;
        result.error(err);
        if (a.mark !== false) times.mark(a.mark ?? 'gave up', 'bad');
        stage.say(a.bad(err), a.badTone ?? 'bad');
        return false;
      }
    },
    start(go, pause = 1500, label = 'Run') {
      if (stage.preview) {
        stage.play(async (wait) => {
          await go();
          await wait(pause);
        });
        return;
      }
      const b = button(stage.bar!, label, () => {
        b.disabled = true;
        stage.task(async () => {
          try {
            await go();
          } finally {
            b.disabled = false;
          }
        });
      });
      b.click();
    },
    dispose: stage.dispose,
  };
  return lab;
}
