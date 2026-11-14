// A beforeRetry hook throws on a 400: Ky stops and the error reaches you
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

type Case = 'busy' | 'invalid';
const CASES = [
  ['busy', 'server busy (503), then fine'],
  ['invalid', 'form rejected (400)'],
] as const;

const mount: Mount = (el, ctx) => {
  let which: Case = 'invalid';
  let runs = 0;
  const { stage, api, lane, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'Ky is told to retry both 400 and 503. The hook knows a 400 is not worth another try.',
    routes: {
      '/signup': (req) => (which === 'invalid' ? { status: 400, json: { error: 'Email is not valid' } } : req.n < 3 ? { status: 503 } : { json: { welcome: true } }),
    },
  });
  trail('Trips');
  const out = fullResult();

  const again = go(async () => {
    if (stage.preview) which = runs++ % 2 ? 'busy' : 'invalid';
    stage.say(which === 'busy' ? 'Sending the form; the server is busy…' : 'Sending a form the server will reject…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://club.example/signup', {
          retry: { limit: 3, statusCodes: [400, 503], delay: () => 250 },
          hooks: lane.hooks({
            beforeRetry: [
              ({ error }) => {
                if (isHTTPError(error) && error.response.status === 400) {
                  lane.note('beforeRetry', '400: threw, stop', 'bad');
                  // Throwing here ends the retrying and passes the error on as it is.
                  throw error;
                }
                lane.note('beforeRetry', 'worth another go');
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(
      got.ok ? 'A busy server can recover, so the retries went on and it worked.' : "A 400 will never succeed: the hook stopped Ky after 1 try.",
      got.ok ? 'ok' : 'warn',
    );
  });
  if (!stage.preview) select(stage.bar!, 'Server says', CASES.map(([v, t]) => [v, t] as const), (v) => ((which = v), again()));
  return stage.dispose;
};

export default mount;
