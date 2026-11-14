// A beforeRequest hook on the client adds the current token to every call
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  let token = 'tk-monday';
  const { stage, server, lane, seen, trail, go } = hookScene(el, ctx, {
    hint: 'Three calls to three places. Change the token between runs: the next calls pick it up.',
    routes: { '*': { json: { ok: true } } },
  });
  seen('Server received', { headers: ['authorization'], mark: ['authorization'], body: false, fullUrl: true });
  trail('Trips and their token', 'authorization');

  // The client: made once, and no call below mentions the token.
  const api = ky.create({
    fetch: server.fetch,
    prefix: 'https://app.example',
    retry: 0,
    hooks: lane.hooks({
      beforeRequest: [
        ({ request }) => {
          request.headers.set('Authorization', `Bearer ${token}`);
          lane.note('beforeRequest', `stamped ${token}`);
        },
      ],
    }),
  });

  go(async () => {
    if (stage.preview) token = token === 'tk-monday' ? 'tk-tuesday' : 'tk-monday';
    stage.say('Three calls; none of them mentions the token…');
    for (const path of ['inbox', 'calendar', 'contacts']) {
      await api.get(path).json();
      await stage.wait(150);
    }
    stage.say(`All three carried ${token}, and the hook did it each time.`, 'ok');
  });
  if (!stage.preview) textInput(stage.bar!, 'token', token, (v) => (token = v), 10);
  return stage.dispose;
};

export default mount;
