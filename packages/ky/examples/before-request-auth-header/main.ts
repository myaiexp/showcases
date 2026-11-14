// A beforeRequest hook stamps an Authorization header as the request leaves
import type { Mount } from '@/types.ts';
import { checkbox, textInput } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let token = 'tk-7f3a';
  let stamp = true;
  let runs = 0;
  const { stage, api, lane, seen, result, go } = hookScene(el, ctx, {
    hint: 'The profile page only answers people who show a token. Turn the hook off to see the refusal.',
    routes: {
      '/profile': (req) => {
        const who = req.headers.get('authorization');
        return who ? { json: { name: 'Aino', plan: 'family' } } : { status: 401, json: { error: 'Who is this?' } };
      },
    },
  });
  seen('Server received', { headers: ['authorization'], mark: ['authorization'], body: false });
  const out = result();

  const again = go(async () => {
    if (stage.preview) stamp = runs++ % 2 === 1;
    stage.say(stamp ? 'Asking for the profile, with the hook on…' : 'Asking for the profile, with no hook…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://club.example/profile', {
          retry: 0,
          hooks: stamp
            ? lane.hooks({
                beforeRequest: [
                  ({ request }) => {
                    // The request is built and about to leave: add the header to it.
                    request.headers.set('Authorization', `Bearer ${token}`);
                    lane.note('beforeRequest', 'stamped Authorization');
                  },
                ],
              })
            : {},
        })
        .json(),
    );
    stage.say(got.ok ? 'The server saw the token, so it answered.' : 'No token on the request: the server refused.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) {
    textInput(stage.bar!, 'token', token, (v) => (token = v), 8);
    checkbox(stage.bar!, 'add it in a beforeRequest hook', true, (v) => {
      stamp = v;
      again();
    });
  }
  return stage.dispose;
};

export default mount;
