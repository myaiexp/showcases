// With no catcher, an HTTP error rejects the promise, so try/catch sees it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same request three ways: it works, it fails with no catcher, it fails with one.' });
  const server = createServer(stage, {
    'GET /forecast/:day': (req) =>
      req.params['day'] === 'today' ? { json: { sky: 'clear' } } : { status: 500, text: 'The weather machine is down' },
  });
  wire(stage, server, { rows: 0 });
  const outcome = kv(stage.root, 'What the await did');
  outcome.set([], 'Nothing yet');
  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const run = async (day: string, withCatcher: boolean): Promise<void> => {
    outcome.set([], 'Waiting…');
    const request = api.get(`/forecast/${day}`);
    stage.say(withCatcher ? '.get().internalError(() => "no forecast").json()' : '.get().json()  (no catcher at all)');
    try {
      const chain = withCatcher ? request.internalError(() => 'no forecast') : request;
      const value = await chain.json();
      if (stage.disposed) return;
      outcome.set([
        ['promise', 'resolved'],
        ['value', JSON.stringify(value)],
        ['next line', 'ran'],
      ]);
      stage.say(withCatcher ? 'The catcher returned a value, so the await finished normally' : 'A 200 resolves with the data', 'ok');
    } catch (err) {
      if (stage.disposed) return;
      const e = err as { status: number; message: string };
      outcome.set([
        ['promise', 'rejected'],
        ['status', String(e.status)],
        ['message', e.message],
        ['next line', 'skipped, jumped to your catch'],
      ]);
      stage.say('No catcher took the 500, so the promise rejected: only your own try/catch sees it', 'bad');
    }
  };

  runCases(stage, [
    { label: 'Works (200)', run: () => run('today', false) },
    { label: 'Fails, no catcher (500)', run: () => run('tomorrow', false) },
    { label: 'Fails, with a catcher (500)', run: () => run('tomorrow', true) },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
