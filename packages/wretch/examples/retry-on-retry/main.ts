// retry({ onRetry }): the next try can use another address and headers
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'The main address is down. Watch the retry go somewhere else.',
    routes: {
      'GET /posts/:id': () => ({ status: 503 }),
      'GET /backup/posts/:id': (req) => ({ json: findPost(req.params['id']!) }),
    },
    span: ctx.preview ? 1000 : 2000,
    latency: ctx.preview ? 120 : 250,
  });
  const out = pane(stage.root, 'What each try carried');
  server.on((e) => {
    if (e.type !== 'request') return;
    const attempt = e.req.headers.get('x-attempt');
    out.add(`#${e.req.id} ${e.req.path}${attempt ? `  X-Attempt: ${attempt}` : '  (no extra header)'}`, attempt ? 'ok' : 'warn');
  });

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([
      retry({
        delayTimer: stage.preview ? 100 : 300,
        // Runs before each retry. What it returns replaces the address and options of that try.
        onRetry: ({ url, attempt, options }) => ({
          url: url.replace('/posts/', '/backup/posts/'),
          options: { ...options, headers: { ...(options.headers as Record<string, string>), 'X-Attempt': String(attempt) } },
        }),
      }),
    ]);

  const run = solo(async () => {
    tl.reset();
    out.clear();
    stage.say('Asking the main address, which is down');
    const post = await api.get('/posts/2').json<{ title: string }>().catch(() => null);
    if (stage.disposed) return;
    if (post) stage.say(`The retry went to the backup address and brought back "${post.title}"`, 'ok');
    else stage.say('Both addresses failed', 'bad');
  });

  if (stage.bar) button(stage.bar, 'Send again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
