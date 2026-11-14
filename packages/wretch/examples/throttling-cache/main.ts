// throttlingCache({ throttle }): repeat GETs in the window come from memory
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { cameFromCache, logTo, mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Six calls for the same post, one every 300 ms. Change how long answers are remembered.',
    routes: { 'GET /posts/1': () => ({ json: findPost(1) }) },
    span: 2000,
    latency: ctx.preview ? 200 : 250,
  });
  const out = pane(stage.root, 'Six calls');
  const log = logTo(stage, out);
  let throttle = 1000;

  const run = solo(async () => {
    tl.reset();
    out.clear();
    // A fresh cache for every run, so the last run's memory does not leak into this one.
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([throttlingCache({ throttle })]);
    stage.say(`Answers are remembered for ${throttle} ms`);
    const calls: Promise<void>[] = [];
    let hits = 0;
    for (let n = 1; n <= 6; n++) {
      calls.push(
        api
          .get('/posts/1')
          .res()
          .then((res) => {
            if (stage.disposed) return;
            const hit = cameFromCache(res);
            if (hit) {
              hits++;
              tl.mark('cache hit', 'ok');
            }
            log(`Call ${n}: ${hit ? 'from the cache, instantly' : 'asked the server'}`, hit ? 'ok' : 'warn');
          })
          .catch(() => {}),
      );
      if (n < 6) await stage.wait(300);
    }
    await Promise.all(calls);
    if (!stage.disposed) stage.say(`6 calls, ${server.requests.length} real requests, ${hits} answered from the cache`, 'ok');
  });

  if (stage.bar) {
    slider(stage.bar, 'Remember for', 200, 2500, 100, throttle, (v) => (throttle = v), (v) => `${v} ms`);
    button(stage.bar, 'Run again', () => void run());
  }
  runScript(stage, async (wait) => {
    await run();
    await wait(1400);
  });
  return () => stage.dispose();
};

export default mount;
