// A catcher that takes an error means .json() never runs: two counters
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Send good and bad requests and watch which function runs.' });
  const server = createServer(stage, {
    'GET /pages/:n': (req) => (req.params['n'] === 'home' ? { json: { title: 'Home' } } : { status: 404, text: 'No such page' }),
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.notFound()', '.json(callback)'], 'Which one ran this time');
  const counts = kv(stage.root, 'Times each one has run');
  let jsonRuns = 0;
  let catcherRuns = 0;
  const showCounts = (): void =>
    counts.set([
      ['.json(callback)', String(jsonRuns)],
      ['.notFound()', String(catcherRuns)],
    ]);
  showCounts();

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const send = async (page: string): Promise<void> => {
    ran.reset();
    stage.say(`api.get("/pages/${page}")`);
    await api
      .get(`/pages/${page}`)
      .notFound(() => {
        catcherRuns += 1;
        ran.fire('.notFound()', 'warn', '404: the catcher took it');
        stage.say('404: the catcher ran, and the .json() callback was skipped', 'warn');
      })
      .json(() => {
        jsonRuns += 1;
        ran.fire('.json(callback)', 'ok', '200: the callback ran');
        stage.say('200: no error, so the .json() callback ran', 'ok');
      })
      .catch(() => {});
    if (!stage.disposed) showCounts();
  };

  runCases(stage, [
    { label: 'Good page (200)', run: () => send('home') },
    { label: 'Missing page (404)', run: () => send('nowhere') },
    { label: 'Missing page again (404)', run: () => send('gone') },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
