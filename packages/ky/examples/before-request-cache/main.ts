// A beforeRequest hook answers from a cache, so repeat calls never travel
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { logView } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  const cache = new Map<string, unknown>(); // address -> the answer we saved
  const { stage, server, api, lane, go } = hookScene(el, ctx, {
    hint: 'Run asks for the same forecast three times. The cache survives between runs: forget it to start over.',
    routes: { '/forecast': { json: { city: 'Oulu', temp: -3 } } },
  });
  const log = logView(stage.row(), 'Where each answer came from', stage.preview ? 3 : 6);
  const hooks = lane.hooks({
    beforeRequest: [
      ({ request }) => {
        const saved = cache.get(request.url);
        if (saved === undefined) return;
        lane.note('beforeRequest', 'cache hit: no trip', 'ok');
        // A returned Response is the answer; Ky sends nothing and skips the other beforeRequest hooks.
        return Response.json(saved);
      },
    ],
    afterResponse: [
      async ({ request, response }) => {
        // The hook gets its own copy of the answer, so reading it here leaves the caller's intact.
        // (afterResponse also sees answers the other hook made up, so only save real ones.)
        if (cache.has(request.url)) return;
        cache.set(request.url, await response.json());
        lane.note('afterResponse', 'saved a copy');
      },
    ],
  });

  go(async () => {
    log.clear();
    if (stage.preview) cache.clear();
    for (let i = 1; i <= 3; i++) {
      stage.say(`Asking for the forecast (${i} of 3)…`);
      const before = server.requests.length;
      const t = performance.now();
      await api.get('https://weather.example/forecast', { hooks }).json();
      const trips = server.requests.length - before;
      log.add(`${i}. ${trips ? 'from the server' : 'from the cache'}, ${Math.round(performance.now() - t)} ms`, trips ? 'warn' : 'ok');
      await stage.wait(150);
    }
    const trips = server.requests.length;
    stage.say(trips ? `Three questions, ${trips} trip to the server.` : 'Three questions, no trips: the cache already knew.', 'ok');
  });
  if (!stage.preview) button(stage.bar!, 'Forget the cache', () => cache.clear());
  return stage.dispose;
};

export default mount;
