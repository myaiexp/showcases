// Retry on 401 + beforeRetry refreshes the token for every later call
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, lane, server, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'The session starts with an expired token. Only the first call should feel it.',
    routes: {
      'POST /refresh': { json: { token: 'tk-2' } },
      '*': (req) => (req.headers.get('authorization') === 'Bearer tk-2' ? { json: { ok: true } } : { status: 401 }),
    },
  });
  trail('Trips and their token', 'authorization');
  const out = fullResult();

  go(async () => {
    let token = 'tk-1'; // the session's token, expired from the start
    const session = api.extend({
      retry: { statusCodes: [401], limit: 1, delay: () => 150 },
      hooks: lane.hooks({
        // Every call starts by reading the current token.
        beforeRequest: [({ request }) => void request.headers.set('Authorization', `Bearer ${token}`)],
        // A 401 is retried; before the retry, get a new token and use it.
        beforeRetry: [
          async ({ request }) => {
            lane.note('beforeRetry', 'refreshing the token…');
            ({ token } = await api.post('https://auth.example/refresh').json<{ token: string }>());
            request.headers.set('Authorization', `Bearer ${token}`);
            lane.note('beforeRetry', `now using ${token}`, 'ok');
          },
        ],
      }),
    });
    stage.say('Three calls with the same session…');
    let last: Awaited<ReturnType<typeof attempt>> | undefined;
    for (const path of ['inbox', 'calendar', 'contacts']) {
      last = await attempt(stage, out, () => session.get(`https://app.example/${path}`).json());
      await stage.wait(120);
    }
    stage.say(last?.ok ? `The first call needed a refresh (${server.requests.length} trips in all); the other two went straight through.` : 'Failed.', last?.ok ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
