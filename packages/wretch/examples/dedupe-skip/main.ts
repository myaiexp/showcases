// dedupe() skips POSTs and any request marked skipDedupe: they always go through
import wretch from 'wretch';
import { dedupe } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { callers, mwScene, solo, volley } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  // Both routes answer with how many times this address has been asked.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Three identical calls each time. Count the bars and the numbers.',
    routes: {
      'GET /views': (req) => ({ json: { n: req.attempt } }),
      'POST /likes': (req) => ({ json: { n: req.attempt } }),
    },
    span: ctx.preview ? 1000 : 1500,
    latency: ctx.preview ? 300 : 450,
  });
  const screens = callers(stage, 3);
  const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([dedupe()]);

  const gap = stage.preview ? 60 : 120;
  const go = solo(async (title: string, call: () => Promise<{ n: number }>) => {
    tl.reset();
    screens.forEach((s) => s.clear());
    stage.say(title);
    await volley(stage, tl, 3, gap, (i) =>
      call()
        .then((r) => screens[i]!.show(`answer #${r.n}`, 'ok'))
        .catch(() => screens[i]!.show('failed', 'bad')),
    );
    if (stage.disposed) return;
    const n = server.requests.length;
    stage.say(n === 1 ? 'One request: the three calls shared it' : `${n} requests: every call went through on its own`, n === 1 ? 'ok' : 'warn');
  });

  runCases(stage, [
    { label: '3 GETs', run: () => go('Three GETs for the same address', () => api.get('/views').json<{ n: number }>()) },
    { label: '3 POSTs', run: () => go('Three POSTs: writes are skipped by default', () => api.post({ like: true }, '/likes').json<{ n: number }>()) },
    {
      label: '3 GETs with skipDedupe',
      run: () => go('Three GETs, each marked skipDedupe', () => api.options({ skipDedupe: true }).get('/views').json<{ n: number }>()),
    },
  ], 1700);
  return () => stage.dispose();
};

export default mount;
