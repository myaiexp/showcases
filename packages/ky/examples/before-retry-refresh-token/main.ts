// beforeRetry swaps in a fresh token, so the retry succeeds
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, lane, seen, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'Your token has expired. The first try is refused; the hook gets a new token for the second.',
    routes: {
      'POST /refresh': { json: { token: 'tk-new' } },
      '/orders': (req) => (req.headers.get('authorization') === 'Bearer tk-new' ? { json: { orders: 3 } } : { status: 401 }),
    },
  });
  seen('Server received', { headers: ['authorization'], mark: ['authorization'], body: false });
  trail('Trips and their token', 'authorization');
  const out = fullResult();

  go(async () => {
    stage.say('Loading orders with an old token…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://shop.example/orders', {
          headers: { authorization: 'Bearer tk-old' },
          // 401 is not retried by default, so ask for it.
          retry: { limit: 1, statusCodes: [401], delay: () => 200 },
          hooks: lane.hooks({
            beforeRetry: [
              async ({ request }) => {
                lane.note('beforeRetry', 'asking for a new token…');
                const { token } = await api.post('https://shop.example/refresh').json<{ token: string }>();
                // Edit the request that is about to be retried.
                request.headers.set('Authorization', `Bearer ${token}`);
                lane.note('beforeRetry', 'set the new token', 'ok');
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'Refused once, then the retry carried the new token and got in.' : 'Still refused.', got.ok ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
