// retry() default: 4xx goes straight to handlers, 5xx is retried
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Try three different answers from the server and count the bars.',
    routes: {
      'GET /missing': () => ({ status: 404, json: { error: 'No such post' } }),
      'GET /broken-request': () => ({ status: 400, json: { error: 'Bad filter' } }),
      'GET /outage': () => ({ status: 503, json: { error: 'Down' } }),
    },
    span: ctx.preview ? 1500 : 3000,
    latency: ctx.preview ? 120 : 250,
  });
  const out = pane(stage.root, 'What the app does');
  // Retries are limited to three and the waits shortened in cards.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([retry({ maxAttempts: 3, delayTimer: stage.preview ? 100 : 300 })]);

  const go = solo((job: () => Promise<void>) => job());
  const ask = (path: string): Promise<void> =>
    go(async () => {
      tl.reset();
      out.clear();
      await api
        .get(path)
        .notFound(() => out.add('.notFound() showed "No such post"', 'warn'))
        .badRequest(() => out.add('.badRequest() showed "Check your filter"', 'warn'))
        .json()
        .catch(() => out.add('Gave up: "The server is down, try later"', 'bad'));
      if (stage.disposed) return;
      const n = server.requests.length;
      stage.say(
        n === 1 ? 'One request: a client error is the caller\'s mistake, so retrying would not help' : `${n} requests: a server error might pass, so wretch kept trying`,
        n === 1 ? 'ok' : 'warn',
      );
    });

  runCases(stage, [
    { label: '404 Not Found', run: () => ask('/missing') },
    { label: '400 Bad Request', run: () => ask('/broken-request') },
    { label: '503 Unavailable', run: () => ask('/outage') },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
