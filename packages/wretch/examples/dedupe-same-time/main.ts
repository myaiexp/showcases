// dedupe(): identical requests on the way at the same time share one trip
import wretch from 'wretch';
import { dedupe } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { callers, mwScene, solo, volley } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Send three identical calls, with and without dedupe.',
    routes: { 'GET /posts/1': () => ({ json: findPost(1) }) },
    span: ctx.preview ? 1000 : 1500,
    latency: ctx.preview ? 300 : 500,
  });
  const screens = callers(stage, 3);
  let useDedupe = true;

  const run = solo(async () => {
    tl.reset();
    screens.forEach((s) => s.clear());
    // A new client each time, so no dedupe memory carries over.
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares(useDedupe ? [dedupe()] : []);
    stage.say(useDedupe ? 'With dedupe(): three calls for post 1' : 'Without dedupe: three calls for post 1');
    await volley(stage, tl, 3, stage.preview ? 60 : 120, (i) =>
      api
        .get('/posts/1')
        .json<Post>()
        .then((post) => screens[i]!.show(post.title, 'ok'))
        .catch(() => screens[i]!.show('failed', 'bad')),
    );
    if (stage.disposed) return;
    const n = server.requests.length;
    stage.say(n === 1 ? 'Three calls, one request: every screen filled from the same answer' : `Three calls, ${n} requests: the server did the same work every time`, n === 1 ? 'ok' : 'warn');
  });

  if (stage.bar) {
    checkbox(stage.bar, 'dedupe()', useDedupe, (v) => (useDedupe = v));
    button(stage.bar, 'Send three calls', () => void run());
  }
  let n = 0;
  runScript(stage, async (wait) => {
    if (stage.preview) useDedupe = n++ % 2 === 1;
    await run();
    await wait(1400);
  });
  return () => stage.dispose();
};

export default mount;
