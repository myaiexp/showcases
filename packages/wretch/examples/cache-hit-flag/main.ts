// throttlingCache({ flagResponseOnCacheHit }): cached answers carry a flag
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { logTo, mwScene } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const FLAG = 'servedFromCache';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Ask for posts. Repeats come from the cache and are badged.',
    routes: { 'GET /posts/:id': (req) => ({ json: findPost(req.params['id']!) }) },
    span: 3000,
    latency: ctx.preview ? 200 : 250,
  });
  const out = pane(stage.root, 'The app marks each answer');
  const log = logTo(stage, out);

  const freshApi = () =>
    wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([throttlingCache({ throttle: 5000, flagResponseOnCacheHit: FLAG })]);
  let api = freshApi();

  const ask = async (id: number): Promise<void> => {
    // .json() would throw the Response away; .res() keeps it so the flag can be read.
    const res = await api.get(`/posts/${id}`).res().catch(() => null);
    if (stage.disposed || !res) return;
    const cached = FLAG in res;
    log(`Post ${id}  [${cached ? 'cached' : 'fresh'}]${cached && !stage.preview ? `  ${FLAG} = ${String((res as unknown as Record<string, string>)[FLAG])}` : ''}`, cached ? 'info' : 'ok');
    stage.say(cached ? `Post ${id} came from the cache, so the app shows a "cached" badge` : `Post ${id} came from the server`, cached ? 'info' : 'ok');
  };

  if (stage.bar) for (const id of [1, 2, 3]) button(stage.bar, `Get post ${id}`, () => void ask(id));
  runScript(stage, async (wait) => {
    api = freshApi();
    tl.reset();
    out.clear();
    for (const id of [1, 1, 2, 1, 2]) {
      await ask(id);
      await wait(500);
    }
    await wait(900);
  });
  return () => stage.dispose();
};

export default mount;
