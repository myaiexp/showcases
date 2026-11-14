// The README's cache written out: saved answers, waiting calls, a throttle window
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { solo } from '../../shared/mwscene.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';
import './style.css';

type Served = 'server' | 'waited' | 'cache';
type Waiting = [(res: Response) => void, (err: unknown) => void];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Thirty calls for one page arrive in three waves. Each dot is a call; its colour says how it was answered.' });
  const server = createServer(stage, { 'GET /posts/1': () => ({ json: findPost(1) }) }, { latency: 150 });
  // The card has no room for the time axis: the dots and the counts tell the story there.
  const tl = stage.preview ? null : timeline(stage, server, { span: 2000 });
  const dots = document.createElement('div');
  dots.className = 'dots';
  stage.root.append(dots);
  const tally = kv(stage.root, 'How the thirty calls were answered');
  let throttleMs = 500;

  // The README's version. Two changes: each branch tells the caller's context object how it served the call (for the dots),
  // and the README's `noCache` escape hatch is left out.
  const cacheMiddleware = (throttle = 0): ConfiguredMiddleware => {
    const cache = new Map<string, Response>();
    const inflight = new Map<string, Waiting[]>();
    const throttling = new Set<string>();

    return (next) => (url, opts) => {
      const key = `${opts.method}@${url}`;
      const served = (how: Served): void => {
        const context = (opts as { context?: { served?: Served } }).context;
        if (context) context.served = how;
      };

      if (throttling.has(key)) {
        // A saved answer inside the window: serve a copy and skip the rest of the chain.
        if (cache.has(key)) {
          served('cache');
          return Promise.resolve(cache.get(key)!.clone());
        }
        // The same request is already on its way: wait for its answer instead of sending another.
        if (inflight.has(key)) {
          served('waited');
          return new Promise<Response>((resolve, reject) => inflight.get(key)!.push([resolve, reject]));
        }
      }

      if (!inflight.has(key)) inflight.set(key, []);
      // Open the window for `throttle` ms.
      if (throttle && !throttling.has(key)) {
        throttling.add(key);
        setTimeout(() => throttling.delete(key), throttle);
      }

      served('server');
      return next(url, opts)
        .then((res) => {
          cache.set(key, res.clone());
          inflight.get(key)?.forEach(([resolve]) => resolve(res.clone()));
          inflight.delete(key);
          return res;
        })
        .catch((err: unknown) => {
          inflight.get(key)?.forEach(([, reject]) => reject(err));
          inflight.delete(key);
          throw err;
        });
    };
  };

  const waves = [0, 200, 700];
  const run = solo(async () => {
    if (tl) tl.reset();
    else server.reset();
    dots.replaceChildren();
    const cells = waves.map(() => {
      const wave = document.createElement('div');
      wave.className = 'wave';
      dots.append(wave);
      return Array.from({ length: 10 }, () => {
        const d = document.createElement('div');
        d.className = 'spot wr-dim';
        wave.append(d);
        return d;
      });
    });
    const counts: Record<Served, number> = { server: 0, waited: 0, cache: 0 };
    const show = (): void =>
      tally.set([
        ['asked the server', String(counts.server)],
        ['waited for an answer on its way', String(counts.waited)],
        ['served from memory', String(counts.cache)],
      ]);
    show();
    // Built here so each run starts with an empty memory.
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([cacheMiddleware(throttleMs)]);
    stage.say(`cacheMiddleware(${throttleMs}): 30 calls in waves at 0, 200 and 700 ms`);
    const tone: Record<Served, string> = { server: 'warn', waited: 'info', cache: 'ok' };
    const calls = waves.flatMap((offset, w) =>
      cells[w]!.map(async (dot) => {
        await stage.wait(offset);
        const context: { served?: Served } = {};
        await api.options({ context }).get('/posts/1').res().catch(() => null);
        if (stage.disposed || !context.served) return;
        counts[context.served]++;
        dot.className = `spot wr-${tone[context.served]}`;
        show();
      }),
    );
    waves.forEach((offset, i) => stage.after(offset, () => tl?.mark(`wave ${i + 1}`)));
    await Promise.all(calls.map((c) => c.catch(() => {})));
    if (!stage.disposed) {
      stage.say(`30 calls, ${server.requests.length} real requests: orange asked the server, blue waited, green came from memory`, 'ok');
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'Remember for', 100, 1500, 100, throttleMs, (v) => (throttleMs = v), (v) => `${v} ms`);
    button(stage.bar, 'Run again', () => void run());
  }
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
