// An error thrown in beforeRequest is final: nothing is sent, nothing is retried
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let signedIn = false;
  let runs = 0;
  const { stage, server, api, lane, result, trail, go } = hookScene(el, ctx, {
    hint: 'Ky is set to retry up to 3 times. Sign in and the request goes; stay signed out and it never does.',
    routes: { '/inbox': { json: { unread: 4 } } },
  });
  const reached = trail('Reached the server');
  const out = result();

  const again = go(async () => {
    if (stage.preview) signedIn = runs++ % 2 === 1;
    stage.say(signedIn ? 'Signed in: opening the inbox…' : 'Not signed in: opening the inbox…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://mail.example/inbox', {
          retry: { limit: 3, delay: () => 200 },
          hooks: lane.hooks({
            beforeRequest: [
              () => {
                if (!signedIn) {
                  lane.note('beforeRequest', 'threw: not signed in', 'bad');
                  throw new Error('Please sign in first');
                }
                lane.note('beforeRequest', 'checked sign-in', 'ok');
              },
            ],
          }),
        })
        .json(),
    );
    if (!server.requests.length) reached.add('nothing was sent', 'warn');
    stage.say(
      got.ok ? 'Signed in, so the request went out.' : `${server.requests.length} requests sent, 0 retries: a hook's error is not worth retrying.`,
      got.ok ? 'ok' : 'warn',
    );
  });
  if (!stage.preview) {
    checkbox(stage.bar!, 'signed in', false, (v) => {
      signedIn = v;
      again();
    });
  }
  return stage.dispose;
};

export default mount;
