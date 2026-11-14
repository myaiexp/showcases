// A stage for the herd examples: many Ky clients, one struggling server
import ky from 'ky';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { resultView } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { herdView, type Herd } from './retry-herd.ts';

export type Jitter = boolean | ((delay: number) => number) | undefined;

export interface HerdStage {
  stage: Stage;
  herd: Herd;
  /** Starts `clients` Ky clients together; resolves when all are done, with how many got data. */
  run(clients: number, jitter: Jitter): Promise<number>;
  /** Cards loop `go` with a pause; the full view gets a button (and runs once at once). */
  start(go: () => Promise<void>, pause: number, label: string): void;
}

/** The server refuses everything for the first second of a run, then answers. */
export function herdStage(el: HTMLElement, ctx: MountContext, hint: string, span: number, bucket: number): HerdStage {
  const stage = createStage(el, ctx, { hint });
  let runStart = 0;
  const server = stage.server(
    { '/tickets': () => (performance.now() - runStart < 1000 ? { status: 503 } : { json: { left: 40 } }) },
    { latency: 100, delay: 100 },
  );
  const herd = herdView(stage.root, server, stage.signal, span, bucket, 'Requests reaching the server');
  const result = resultView(stage.root, 'Clients that got their tickets');
  const api = ky.extend({ fetch: server.fetch });

  return {
    stage,
    herd,
    start(go, pause, label) {
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
    async run(clients, jitter) {
      server.reset();
      herd.reset();
      result.pending('waiting…');
      runStart = performance.now();
      // Every client starts at the same instant, as after a shared outage or a page reload.
      const all = await Promise.allSettled(
        Array.from({ length: clients }, () => api.get('https://tickets.example/tickets', { retry: { limit: 4, jitter } }).json()),
      );
      if (stage.disposed) return 0;
      const ok = all.filter((r) => r.status === 'fulfilled').length;
      result.value({ clients, gotTickets: ok });
      return ok;
    },
  };
}
