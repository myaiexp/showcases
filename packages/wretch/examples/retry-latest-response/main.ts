// retry({ resolveWithLatestResponse }): give up with the last real answer
import wretch, { type WretchError } from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { screen } from '../../shared/screen.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Run it both ways and compare what the app can show.',
    routes: { 'GET /status': () => ({ status: 503, json: { error: 'Back at 14:00, sorry!' } }) },
    span: ctx.preview ? 1000 : 2000,
    latency: ctx.preview ? 100 : 200,
  });
  const handlers = chips(stage.root, ['.catcher(503)', '.catch()']);
  const shown = screen(stage.root);

  const go = solo((job: () => Promise<void>) => job());
  const ask = (keepLast: boolean): Promise<void> =>
    go(async () => {
      tl.reset();
      handlers.reset();
      shown.clear();
      const api = wretch(BASE)
        .fetchPolyfill(server.fetch)
        .middlewares([retry({ maxAttempts: 2, delayTimer: stage.preview ? 80 : 250, resolveWithLatestResponse: keepLast })]);
      stage.say(`resolveWithLatestResponse: ${keepLast}`);
      await api
        .catcher(503, (err: WretchError) => {
          // The error's message is the answer's body as text.
          const note = (JSON.parse(err.message) as { error: string }).error;
          handlers.fire('.catcher(503)', 'ok', 'The usual handler ran');
          shown.show(`"${note}"`, 'ok');
          stage.say('The last 503 came through, so the app can show the server\'s own note', 'ok');
        })
        .get('/status')
        .json()
        .catch((err: Error) => {
          handlers.fire('.catch()', 'bad', err.message);
          shown.show('Something went wrong.', 'bad');
          stage.say('Only a bare error arrived: the server\'s note is lost', 'bad');
        });
    });

  runCases(stage, [
    { label: 'false (default)', run: () => ask(false) },
    { label: 'true', run: () => ask(true) },
  ], 1800);
  return () => stage.dispose();
};

export default mount;
