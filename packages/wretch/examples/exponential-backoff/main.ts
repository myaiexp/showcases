// retry() with a doubling wait: recovers, gives up, and the recipe's slip
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { mwScene, onWaits } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { screen } from '../../shared/screen.ts';
import { BASE } from '../../shared/server.ts';

type Ramp = (delay: number, attempts: number) => number;

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Saving a note against a shaky server. The first wait is 100 ms.',
    routes: {
      'GET /notes/flaky': (req) => (req.attempt <= 3 ? { status: 503 } : { json: { saved: true } }),
      'GET /notes/down': () => ({ status: 503 }),
      'GET /notes/missing': () => ({ status: 404 }),
    },
    span: ctx.preview ? 1600 : 2400,
    latency: 150,
  });
  const log = pane(stage.root, 'onRetry');
  const shown = screen(stage.root, 'What the app shows');
  let last: HTMLElement | null = null;
  onWaits(server, (waited) => {
    if (last) last.textContent += ` · waited ${waited} ms`;
  });

  const doubling: Ramp = (delay, attempts) => delay * 2 ** (attempts - 1);
  // The recipe's own ramp. It is handed the starting 100 every time, so it never grows.
  const asWritten: Ramp = (delay) => delay * 2;

  const save = async (mode: string, ramp: Ramp, say: string): Promise<void> => {
    tl.reset();
    log.clear();
    shown.clear('Saving…');
    stage.say(say);
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([
        retry({
          delayTimer: 100,
          delayRamp: ramp,
          maxAttempts: 3,
          until: (response) => !!response?.ok,
          onRetry: ({ attempt, response }) => {
            while (log.body.childElementCount >= (stage.preview ? 3 : 8)) log.body.firstElementChild?.remove();
            last = log.add(`Retry ${attempt} · got ${response?.status}`, 'warn');
          },
        }),
      ]);
    const result = await api.get(`/notes/${mode}`).json().catch((error: Error) => error);
    if (stage.disposed) return;
    const failed = result instanceof Error;
    shown.show(failed ? 'Could not save the note.' : 'Saved', failed ? 'bad' : 'ok');
    stage.say(failed ? `Gave up after ${server.requests.length - 1} retries: ${(result as Error).message}` : `Saved on request ${server.requests.length}`, failed ? 'bad' : 'ok');
  };

  runCases(stage, [
    { label: 'Recovers on the 4th try', run: () => save('flaky', doubling, 'Waits double: 100, 200, 400 ms') },
    { label: 'Never recovers', run: () => save('down', doubling, 'The server stays down: three retries, then it gives up') },
    { label: 'Missing note (404)', run: () => save('missing', doubling, 'until: response.ok also retries a 404, which the default would not') },
    { label: 'The recipe as written', run: () => save('flaky', asWritten, 'delay * 2 from the recipe: the wait is 200 ms every time') },
  ], 2000);
  return () => stage.dispose();
};

export default mount;
