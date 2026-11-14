// afterResponse sees a 401, gets a token and forces a retry of a POST
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, lane, seen, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'Placing an order with an expired token. A POST is not retried by default; ky.retry forces it.',
    routes: {
      'POST /auth/refresh': { json: { token: 'tk-new' } },
      'POST /orders': (req) => (req.headers.get('authorization') === 'Bearer tk-new' ? { status: 201, json: { orderId: 5012 } } : { status: 401 }),
    },
  });
  seen('Server received', { headers: ['authorization'], mark: ['authorization'], body: true });
  trail('Trips and their token', 'authorization');
  const out = fullResult();

  go(async () => {
    stage.say('Placing an order with an old token…');
    const got = await attempt(stage, out, () =>
      api
        .post('https://shop.example/orders', {
          json: { item: 'tea', qty: 2 },
          headers: { authorization: 'Bearer tk-old' },
          hooks: lane.hooks({
            afterResponse: [
              async ({ request, response, retryCount }) => {
                if (response.status === 401 && retryCount === 0) {
                  lane.note('afterResponse', '401: getting a new token…', 'warn');
                  const { token } = await api.post('https://shop.example/auth/refresh').json<{ token: string }>();
                  const headers = new Headers(request.headers);
                  headers.set('authorization', `Bearer ${token}`);
                  lane.note('afterResponse', 'forced a retry', 'ok');
                  // The same POST, with its body, goes out again carrying the new token.
                  return ky.retry({ request: new Request(request, { headers }), code: 'TOKEN_REFRESHED' });
                }
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'Refused once; the hook forced one more try of the same POST, and the order went through.' : 'The order failed.', got.ok ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
