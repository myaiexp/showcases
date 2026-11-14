// .defer() runs just before sending, so it can add auth only where needed
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { columns, kv } from '../../shared/screen.ts';
import type { ServerRequest } from '../../shared/server.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both requests are given the token. Only the one for /user gets it attached.' });
  const server = createServer(stage, {
    'GET /user/:id': (req) =>
      req.headers.get('authorization') ? { json: { name: 'Aino', email: 'aino@mail.example' } } : { status: 401, json: { error: 'Log in first' } },
    'GET /posts/:id': () => ({ json: { title: 'Open to everyone' } }),
  });
  wire(stage, server, { rows: 0 });
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const open = kv(left, 'A public page');
  const secret = kv(right, 'A private page');
  const rowsOf = (req: ServerRequest): [string, string][] => [
    ['request', `${req.method} ${req.path}`],
    ['Authorization', req.headers.get('authorization') ?? 'none'],
  ];

  // The callback sees the address and the options just before the request goes out.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .defer((w, url, options) => (/\/user/.test(url) ? w.auth(options['context'].token) : w));

  // The token is not known when `api` is built: it travels in the request's own options.
  const withToken = api.options({ context: { token: 'Bearer t-777' } });

  const run = async (): Promise<void> => {
    open.set([], '…');
    secret.set([], '…');
    stage.say('Same client, same token handed over, two different pages');
    await withToken.get('/posts/1').json().catch(() => {});
    if (stage.disposed) return;
    open.set(rowsOf(server.requests.at(-1)!));
    await withToken.get('/user/1').json().catch(() => {});
    if (stage.disposed) return;
    secret.set(rowsOf(server.requests.at(-1)!));
    stage.say('Only the /user request carries the Authorization header', 'ok');
  };

  if (stage.bar) button(stage.bar, 'Send both', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(2200);
  });
  return () => stage.dispose();
};

export default mount;
