// retry() with no options: wait, try again, wait longer, until the server recovers
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { mwScene, onWaits, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { runScript } from '../../shared/cases.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  // The server is busy for its first two answers, then recovers.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Send the request and watch the pauses between the tries.',
    routes: {
      'GET /posts/1': (req) => (req.attempt <= 2 ? { status: 503, json: { error: 'Busy' } } : { json: findPost(1) }),
    },
    span: ctx.preview ? 1500 : 3000,
    latency: ctx.preview ? 150 : 300,
  });
  const out = pane(stage.root, 'What happened');
  onWaits(server, (ms, n) => out.add(`Waited ${ms} ms, then try ${n}`, 'warn'));

  // Cards shorten the wait to keep their loop quick; the full view uses the documented 500 ms.
  const options = stage.preview ? { delayTimer: 150 } : {};
  const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([retry(options)]);

  const run = solo(async () => {
    tl.reset();
    out.clear();
    stage.say('Asking for the post. The server is busy and will say 503 twice.');
    const post = await api.get('/posts/1').json<Post>().catch(() => null);
    if (stage.disposed) return;
    if (post) {
      out.add(`The app got "${post.title}"`, 'ok');
      stage.say(`It took ${server.requests.length} tries; each wait was longer than the one before, and the app never saw a 503`, 'ok');
    } else stage.say('Every try failed', 'bad');
  });

  if (stage.bar) button(stage.bar, 'Send again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1600);
  });
  return () => stage.dispose();
};

export default mount;
