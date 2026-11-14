// throttlingCache({ condition }): which answers are allowed into the cache
import wretch, { type WretchOptions } from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { cameFromCache, logTo, mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

// 3.0.9 types the condition's argument as WretchOptions; at run time it is the Response.
const mount: Mount = (el, ctx) => {
  // The first answer is a 500, every later one is fine.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Call a shaky address three times, with two different conditions.',
    routes: { 'GET /shaky': (req) => (req.attempt === 1 ? { status: 500, json: { error: 'Oops' } } : { json: { ok: true } }) },
    span: 2500,
    latency: ctx.preview ? 150 : 250,
  });
  const out = pane(stage.root, 'Three calls');
  const log = logTo(stage, out);

  const go = solo(async (title: string, condition: (response: WretchOptions) => boolean) => {
    tl.reset();
    out.clear();
    stage.say(title);
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([throttlingCache({ throttle: 5000, condition })]);
    for (let n = 1; n <= 3; n++) {
      // The 500 would reject; this handler turns it back into the Response so it can be shown.
      const res = await api
        .get('/shaky')
        .internalError((err) => err.response)
        .res()
        .catch(() => null);
      if (stage.disposed) return;
      if (res) {
        const hit = cameFromCache(res);
        if (hit) tl.mark('cache hit', 'ok');
        log(`Call ${n}: ${res.status} ${res.ok ? 'fine' : 'error'}${hit ? ' (from the cache)' : ''}`, res.ok ? 'ok' : 'bad');
      }
      await stage.wait(400);
    }
    if (!stage.disposed) {
      const retried = server.requests.length > 1;
      stage.say(retried ? 'The error was not kept: the second call asked again and got the good answer' : 'The error was kept: later calls got the same 500 without asking the server', retried ? 'ok' : 'bad');
    }
  });

  runCases(stage, [
    { label: 'condition: response.ok', run: () => go('Only good answers are cached (the default)', (response) => response.ok) },
    { label: 'condition: always true', run: () => go('Every answer is cached, even the 500', () => true) },
  ], 1600);
  return () => stage.dispose();
};

export default mount;
