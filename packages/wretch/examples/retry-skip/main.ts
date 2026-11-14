// retry({ skip }): requests the middleware must send once and never repeat
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findPost } from '../../shared/data.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  // Both addresses fail at first; the GET recovers on its third answer.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Send a read and a write against a server that is having a bad moment.',
    routes: {
      'GET /posts/1': (req) => (req.attempt < 3 ? { status: 503 } : { json: findPost(1) }),
      'POST /orders': () => ({ status: 503 }),
    },
    span: ctx.preview ? 1500 : 3000,
    latency: ctx.preview ? 120 : 250,
  });
  const out = pane(stage.root, 'What the app shows');
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([
      retry({
        delayTimer: stage.preview ? 100 : 300,
        // True means "do not retry this one".
        skip: (_url, opts) => opts.method !== 'GET',
      }),
    ]);

  const go = solo((job: () => Promise<void>) => job());
  const reset = (): void => {
    tl.reset();
    out.clear();
  };

  runCases(stage, [
    {
      label: 'Read (GET)',
      run: () =>
        go(async () => {
          reset();
          const post = await api.get('/posts/1').json<{ title: string }>().catch(() => null);
          if (stage.disposed) return;
          out.add(post ? `Got "${post.title}"` : 'Failed', post ? 'ok' : 'bad');
          stage.say(`The GET was retried and worked on request ${server.requests.length}`, 'ok');
        }),
    },
    {
      label: 'Write (POST)',
      run: () =>
        go(async () => {
          reset();
          await api
            .post({ item: 'socks' }, '/orders')
            .json()
            .catch(() => out.add('Order failed. Nothing was sent twice.', 'bad'));
          if (stage.disposed) return;
          stage.say(`Only ${server.requests.length} request: skip kept retry away, so the order cannot be placed twice`, 'warn');
        }),
    },
  ], 1700);
  return () => stage.dispose();
};

export default mount;
