// retry() skips 4xx in v3; until: res.ok brings the v2 behaviour back
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { solo } from '../../shared/mwscene.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two clients ask for a post that does not exist. Count the bars each one makes.' });
  const server = createServer(stage, { 'GET /:version/posts/:id': () => ({ status: 404, json: { error: 'No such post' } }) }, { latency: stage.preview ? 120 : 200 });
  // Each bar is named after the client that sent it: the first segment of the path.
  const tl = timeline(stage, server, { span: stage.preview ? 1500 : 3000, label: (_id, _m, path, status) => `${path.slice(1, 3)} ${status}` });
  const [left, right] = columns(stage.root, 2);
  const v3Screen = screen(left!, 'v3, the default', '…');
  const v2Screen = screen(right!, 'v2 behaviour', '…');
  let attempts = 3;
  const delayTimer = stage.preview ? 100 : 250;

  const run = solo(async () => {
    tl.reset();
    v3Screen.clear('Asking…');
    v2Screen.clear('Asking…');
    const base = wretch(BASE).fetchPolyfill(server.fetch);
    // v3: retry() with no settings. A 404 counts as "done", so it goes to the handler.
    const v3 = base.middlewares([retry({ maxAttempts: attempts, delayTimer })]);
    // v2: every response that is not ok is retried, 4xx included.
    const v2 = base.middlewares([retry({ maxAttempts: attempts, delayTimer, until: (response) => !!response && response.ok })]);
    stage.say(`Both ask for /posts/99 and get 404; the v2 client may retry up to ${attempts} times`);
    await Promise.all([
      v3
        .get('/v3/posts/99')
        .notFound(() => v3Screen.show('Post not found, shown straight away', 'ok'))
        .json()
        .catch(() => v3Screen.show('Failed', 'bad')),
      v2
        .get('/v2/posts/99')
        .notFound(() => v2Screen.show('Post not found', 'ok'))
        .json()
        // Out of retries, retry() rejects with its own error, so .notFound() never runs.
        .catch(() => v2Screen.show(`Gave up after ${attempts + 1} identical requests`, 'warn')),
    ]);
    if (stage.disposed) return;
    const count = (v: string): number => server.requests.filter((r) => r.path.startsWith(`/${v}/`)).length;
    stage.say(`v3 sent ${count('v3')} request, the v2 behaviour sent ${count('v2')}: a 404 stays a 404 however often you ask`, 'ok');
  });

  if (stage.bar) {
    slider(stage.bar, 'Retries', 1, 5, 1, attempts, (v) => (attempts = v));
    button(stage.bar, 'Ask again', () => void run());
  }
  runScript(stage, async (wait) => {
    await run();
    await wait(1600);
  });
  return () => stage.dispose();
};

export default mount;
