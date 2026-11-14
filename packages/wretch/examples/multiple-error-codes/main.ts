// .catcher([401, 403], ...) gives several status codes one shared handler
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four doors. Two kinds of "no" share one handler.' });
  const server = createServer(stage, {
    'GET /door/:n': (req) => {
      const n = req.params['n']!;
      if (n === 'locked') return { status: 401, text: 'Who are you?' };
      if (n === 'private') return { status: 403, text: 'You may not enter' };
      if (n === 'missing') return { status: 404, text: 'No such door' };
      return { json: { room: 'the library' } };
    },
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.catcher([401, 403])', '.json()', '.catch()']);
  const shown = screen(stage.root, 'What the app shows');

  // One handler, set once for two codes.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .catcher([401, 403], (err) => {
      ran.fire('.catcher([401, 403])', 'warn', `status ${err.status}`);
      shown.show(`Access problem (${err.status}): go to the sign-in page`, 'warn');
      stage.say(`${err.status} landed in the shared handler`, 'warn');
    });

  const knock = async (door: string): Promise<void> => {
    ran.reset();
    shown.clear();
    stage.say(`api.get("/door/${door}").json()`);
    await api
      .get(`/door/${door}`)
      .json((r: { room: string }) => {
        ran.fire('.json()', 'ok', '200');
        shown.show(`You are in ${r.room}`, 'ok');
        stage.say('A normal answer goes to .json()', 'ok');
      })
      .catch((err: { status?: number }) => {
        if (stage.disposed) return;
        ran.fire('.catch()', 'bad', `status ${err.status}: no catcher claimed it`);
        shown.show(`Nobody handled ${err.status}`, 'bad');
        stage.say(`${err.status} is not in the list, so it was not caught by the shared handler`, 'bad');
      });
  };

  runCases(stage, [
    { label: 'Open door (200)', run: () => knock('open') },
    { label: 'Locked door (401)', run: () => knock('locked') },
    { label: 'Private door (403)', run: () => knock('private') },
    { label: 'Missing door (404)', run: () => knock('missing') },
  ], 1400);
  return () => stage.dispose();
};

export default mount;
