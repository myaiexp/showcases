// context hands a token to a hook; the hook decides what the request carries
import type { Mount } from '@/types.ts';
import { requestView, resultView } from '../../shared/panels.ts';
import { attempt, cycle } from '../../shared/req-kit.ts';
import { scene } from '../../shared/inst-kit.ts';

const USERS: Record<string, string> = { 'aino-77': 'Aino', 'bashir-12': 'Bashir' };

const CALLS = [
  { label: 'Aino signed in', context: { token: 'aino-77' } },
  { label: 'Bashir signed in', context: { token: 'bashir-12' } },
  { label: 'Nobody signed in', context: {} },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api: plain } = scene(el, ctx, {
    hint: 'The token is given to the call as context. A hook picks it up and puts it where the server looks.',
    routes: {
      '/account': (req) => {
        const name = USERS[(req.headers.get('authorization') ?? '').replace('Bearer ', '')];
        return name ? { json: { greeting: `Hello ${name}` } } : { status: 401, json: { error: 'Please sign in' } };
      },
    },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: ['authorization'], mark: ['authorization'] });
  const out = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  // One client for the whole app: its hook turns context.token into a header.
  const api = plain.extend({
    hooks: {
      beforeRequest: [
        ({ request, options }) => {
          // options.context is always an object, so no `?.` is needed.
          const { token } = options.context;
          if (typeof token === 'string') request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
    },
  });

  cycle(stage, CALLS, async (item) => {
    stage.say(`${item.label}: asking for the account page…`);
    // The Ky call: the token rides in `context`, not in the URL, headers or body.
    const got = await attempt(stage, out, () => api.get('https://shop.example/account', { context: item.context, retry: 0 }).json());
    stage.say(got.ok ? 'The hook read the token from context and added the header.' : 'No token in context, so the hook added nothing: the server refused.', got.ok ? 'ok' : 'warn');
  });
  return stage.dispose;
};

export default mount;
