// A 401 handler renews the credentials and replays the original request
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const FRESH = 'fresh-pass';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The client starts with an expired password. Send the request and watch the wire.' });
  const server = createServer(stage, {
    'GET /account': (req) => {
      const given = (req.headers.get('authorization') ?? '').replace('Basic ', '');
      return atob(given || 'Og==') === `aino:${FRESH}` ? { json: { name: 'Aino', plan: 'free' } } : { status: 401, json: { error: 'Expired' } };
    },
    'GET /renew': () => ({ json: { password: FRESH } }),
  });
  const w = wire(stage, server, { rows: stage.preview ? 3 : 5 });
  const screen = pane(stage.root, 'What the app shows');
  screen.set('Nothing yet', 'dim');

  const renewPassword = async (): Promise<string> => {
    const { password } = await wretch(BASE).fetchPolyfill(server.fetch).get('/renew').json<{ password: string }>();
    return password;
  };

  // The client starts with an expired password. On a 401 it renews it and replays the request.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .addon(BasicAuthAddon)
    .basicAuth('aino', 'old-pass')
    .resolve((chain) =>
      chain.unauthorized(async (_error, req) => {
        w.note('401: the password expired, fetching a new one', 'warn');
        const password = await renewPassword();
        w.note('replaying the same request with the new password', 'info');
        // `req` is the original request. The extra .unauthorized() stops a second 401 from looping.
        return req
          .basicAuth('aino', password)
          .fetch()
          .unauthorized((error) => {
            throw error;
          })
          .json();
      }),
    );

  const run = async (): Promise<void> => {
    server.reset();
    w.clear();
    screen.set('Loading…', 'dim');
    stage.say('api.get("/account").json(): the first try uses the old password');
    const account = (await api.get('/account').json()) as { name: string; plan: string };
    if (stage.disposed) return;
    screen.set(`Welcome back, ${account.name} (${account.plan} plan)`, 'ok');
    stage.say('The app got its account and never saw the 401: the handler fixed it behind the scenes', 'ok');
  };
  const safe = (): void => void run().catch(() => {});

  if (stage.bar) button(stage.bar, 'Load my account', safe);
  if (stage.preview) {
    stage.play(async (wait) => {
      await run();
      await wait(3000);
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
