// ky.get(url).json(): ask the server for a user and get plain data back in one line
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { resultView, requestView } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';

const USERS = [
  { id: 1, name: 'Aino', city: 'Tampere', plan: 'pro' },
  { id: 2, name: 'Bashir', city: 'Lyon', plan: 'free' },
  { id: 3, name: 'Chen', city: 'Taipei', plan: 'pro' },
  { id: 4, name: 'Dalia', city: 'Lima', plan: 'team' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each press asks the pretend server for the next user.' });
  const server = stage.server({
    '/users/*': (req) => {
      const id = Number(req.url.pathname.split('/').pop());
      const user = USERS.find((u) => u.id === id);
      return user ? { json: user } : { status: 404, json: { error: 'No such user' } };
    },
  });
  stage.wire(server);
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: ['accept'], mark: ['accept'] });
  const result = resultView(row, 'const user =');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  // The pretend server stands in for the network: Ky sends through it via the `fetch` option.
  const api = ky.extend({ fetch: server.fetch });

  let next = 0;
  const load = async (): Promise<void> => {
    const id = USERS[next++ % USERS.length]!.id;
    result.pending();
    stage.say(`ky.get('…/users/${id}').json()`);
    // One line: send the request, check the status, parse the JSON.
    const user = await api.get(`https://api.example/users/${id}`).json<(typeof USERS)[number]>();
    result.value(user);
    stage.say(`Got ${user.name} from ${user.city}: a plain object, ready to use.`, 'ok');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await load();
      await wait(1600);
    });
  } else {
    button(stage.bar!, 'Load next user', () => stage.task(load));
    stage.task(load);
  }
  return stage.dispose;
};

export default mount;
