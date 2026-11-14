// .middlewares([retry(), dedupe()]): two layers, three callers, two requests
import wretch from 'wretch';
import { dedupe, retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { callers, mwScene, solo, volley } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  // A flaky endpoint: the very first answer is a 503, every later one is fine.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Three parts of the app ask for the same post at nearly the same time.',
    routes: { 'GET /posts/1': (req) => (req.attempt === 1 ? { status: 503 } : { json: findPost(1) }) },
    span: ctx.preview ? 1500 : 2500,
    latency: ctx.preview ? 300 : 400,
  });
  const screens = callers(stage, 3);

  // Layers are listed outermost first. Built here so each mount has its own dedupe memory.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([retry({ delayTimer: stage.preview ? 150 : 400 }), dedupe()]);

  const run = solo(async () => {
    tl.reset();
    screens.forEach((s) => s.clear());
    stage.say('Three calls for post 1, while the server is about to fail once');
    await volley(stage, tl, 3, stage.preview ? 50 : 100, (i) =>
      api
        .get('/posts/1')
        .json<Post>()
        .then((post) => screens[i]!.show(post.title, 'ok'))
        .catch(() => screens[i]!.show('failed', 'bad')),
    );
    if (!stage.disposed) stage.say(`3 calls, ${server.requests.length} requests: dedupe merged the asks, retry covered the 503`, 'ok');
  });

  if (stage.bar) button(stage.bar, 'Ask again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
