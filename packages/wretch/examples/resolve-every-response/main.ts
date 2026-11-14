// .resolve() programs the response step once for every request
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { PRODUCTS, USERS, findPost } from '../../shared/data.ts';
import { pretty } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No .json() on any request below: the client does it.' });
  const server = createServer(stage, {
    'GET /posts/:id': (req) => ({ json: findPost(req.params['id']!) }),
    'GET /users/:id': (req) => ({ json: USERS.find((u) => String(u.id) === req.params['id']) }),
    'GET /products': () => ({ json: PRODUCTS.slice(0, 2).map((p) => p.name) }),
  });
  wire(stage, server, { rows: 0 });
  const shown = screen(stage.root, 'What `await api.get(…)` gave back');

  // Every answer is turned into JSON before the caller sees it.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .resolve((r) => r.json());

  const show = async (path: string): Promise<void> => {
    stage.say(`await api.get("${path}")`);
    const data: unknown = await api.get(path).catch(() => 'failed');
    if (stage.disposed) return;
    shown.show(pretty(data), 'ok');
    stage.say('That is the data itself, not a response to unpack', 'ok');
  };

  runCases(stage, [
    { label: 'A post', run: () => show('/posts/1') },
    { label: 'A user', run: () => show('/users/2') },
    { label: 'Products', run: () => show('/products') },
  ]);
  return () => stage.dispose();
};

export default mount;
