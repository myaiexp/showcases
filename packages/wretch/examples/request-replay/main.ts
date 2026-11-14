// A 401 handler renews the password and replays the request, side by side
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const CURRENT = 'swan-2026';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open the vault with an old password, or with the current one.' });
  const server = createServer(stage, {
    'GET /vault': (req) => {
      const login = atob((req.headers.get('authorization') ?? '').replace('Basic ', '') || 'Og==');
      return login === `aino:${CURRENT}` ? { json: { secret: 'The spare key is under the blue pot' } } : { status: 401, text: 'Wrong password' };
    },
    'GET /password': () => ({ text: CURRENT }),
  });
  wire(stage, server, { rows: 0 });
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const first = envelope(stage, { parent: left, title: '1st request', headers: ['authorization'], noBody: true });
  const second = envelope(stage, { parent: right, title: 'Replayed request', headers: ['authorization'], noBody: true });
  const shown = screen(stage.root, 'What the app shows');
  stage.onDispose(
    server.on((e) => {
      if (e.type !== 'request' || e.req.path !== '/vault') return;
      (e.req.attempt === 1 ? first : second).show(e.req);
    }),
  );

  const open = async (password: string): Promise<void> => {
    server.reset();
    first.show(null);
    second.show(null);
    shown.clear('Opening…');
    stage.say(`.basicAuth("aino", "${password}").get("/vault")`);
    const vault = await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .addon(BasicAuthAddon)
      .basicAuth('aino', password)
      .get('/vault')
      .unauthorized(async (_error, req) => {
        stage.say('401: the password was refused. Fetching the current one, then sending the same request again', 'warn');
        const renewed = await wretch(BASE).fetchPolyfill(server.fetch).get('/password').text();
        // `req` is the original request: change the password on it and send it again.
        return req
          .basicAuth('aino', renewed)
          .fetch()
          .unauthorized((err) => {
            throw err;
          })
          .json();
      })
      .json()
      .catch(() => null);
    if (stage.disposed) return;
    const replayed = server.requests.filter((r) => r.path === '/vault').length > 1;
    if (!vault) return shown.show('Could not open the vault', 'bad');
    shown.show((vault as { secret: string }).secret, 'ok');
    stage.say(replayed ? 'Same address, new password: the replay worked and the app never saw the 401' : 'The password was right the first time: no replay needed', 'ok');
  };

  runCases(stage, [
    { label: 'Old password', run: () => open('old-pass') },
    { label: 'Current password', run: () => open(CURRENT) },
  ], 2600);
  return () => stage.dispose();
};

export default mount;
