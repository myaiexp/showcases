// .fetchError() handles a request that got no answer at all, unlike an HTTP error
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer, type Reply } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const ANSWERS: Record<string, Reply> = {
  fine: { json: { headline: 'Lake freezes early' } },
  broken: { status: 500, text: 'The newsroom is on fire' },
  lost: { network: true },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three ways a request can end: an answer, a bad answer, or no answer.' });
  const server = createServer(stage, { 'GET /news/:how': (req) => ANSWERS[req.params['how']!]! });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.internalError()', '.fetchError()', '.json()']);
  const shown = screen(stage.root, 'What the app shows');

  const load = async (how: keyof typeof ANSWERS): Promise<void> => {
    ran.reset();
    shown.clear('Loading…');
    stage.say(how === 'lost' ? 'The connection drops before the server can answer' : `The server answers (${how})`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/news/${how}`)
      // An answer arrived, but it was a failure: it has a status.
      .internalError((err) => {
        ran.fire('.internalError()', 'bad', `status ${err.status}: the server answered`);
        shown.show('The news site is broken. It knows, and is working on it', 'bad');
        stage.say('The server answered 500: .internalError() ran, .fetchError() did not', 'bad');
      })
      // No answer arrived at all: there is no status, only the failure from fetch.
      .fetchError((err) => {
        if (stage.disposed) return;
        ran.fire('.fetchError()', 'warn', `no status; fetch said: ${err.message}`);
        shown.show('Cannot reach the news site. Check your connection', 'warn');
        stage.say('Nothing came back, so there was no status: .fetchError() ran', 'warn');
      })
      .json((news: { headline: string }) => {
        ran.fire('.json()', 'ok', '200');
        shown.show(news.headline, 'ok');
        stage.say('A normal answer goes to .json()', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Works', run: () => load('fine') },
    { label: 'Server error 500', run: () => load('broken') },
    { label: 'Connection lost', run: () => load('lost') },
  ]);
  return () => stage.dispose();
};

export default mount;
