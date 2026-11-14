// throttlingCache({ clear }): one request that wipes everything cached
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { cameFromCache, mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Read three pages twice, log out, then read them again.',
    routes: {
      'GET /posts/:id': (req) => ({ json: findPost(req.params['id']!) }),
      'POST /logout': () => ({ status: 204 }),
    },
    span: 3000,
    latency: ctx.preview ? 120 : 220,
  });
  const out = pane(stage.root, 'The cache holds');

  const run = solo(async () => {
    tl.reset();
    // The middleware instance exposes its memory as `.cache`, a Map keyed by "METHOD@address".
    const cache = throttlingCache({
      throttle: 20_000,
      // Called for every request; true empties the whole cache before the request goes on.
      clear: (url, opts) => opts.method === 'POST' && url.endsWith('/logout'),
    });
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([cache]);
    const showCache = (): void => {
      const keys = [...cache.cache.keys()].map((k: string) => k.replace(/^.*?@https:\/\/api\.example/, ''));
      out.set(keys.length ? keys.join('  ') : 'nothing', keys.length ? 'ok' : 'dim');
    };
    const read = async (id: number): Promise<void> => {
      const res = await api.get(`/posts/${id}`).res();
      if (res.ok && cameFromCache(res)) tl.mark(`hit ${id}`, 'ok');
      showCache();
    };
    try {
      showCache();
      stage.say('Reading three posts: each goes to the server once');
      for (const id of [1, 2, 3]) await read(id);
      stage.say('Reading them again: all three come from the cache');
      for (const id of [1, 2, 3]) await read(id);
      await stage.wait(250);
      stage.say('Logging out: the clear option empties the cache', 'warn');
      tl.mark('log out', 'warn');
      await api.post({}, '/logout').res();
      showCache();
      await stage.wait(300);
      stage.say('Reading post 1 again: the cache is empty, so the server is asked');
      await read(1);
      if (!stage.disposed) stage.say(`${server.requests.length} real requests in all; the cache started over after the log-out`, 'ok');
    } catch (err) {
      if (!stage.disposed) console.error(err);
    }
  });

  if (stage.bar) button(stage.bar, 'Run again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
