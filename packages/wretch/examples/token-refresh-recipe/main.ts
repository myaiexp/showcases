// A 401 renews the token once, and every later request already carries the new one
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The app starts with token-0. The server only honours its newest token.' });
  let current = 1; // the newest token the server will accept
  const server = createServer(stage, {
    'GET /inbox': (req) => {
      const login = atob((req.headers.get('authorization') ?? '').replace('Basic ', '') || 'Og==');
      return login === `user:token-${current}` ? { json: { unread: 3 } } : { status: 401, json: { error: 'Token expired' } };
    },
    'POST /token': () => ({ json: { token: `token-${current}` } }),
  });
  const w = wire(stage, server, { rows: stage.preview ? 2 : 6 });
  const held = kv(stage.root, 'The app');
  const shown = screen(stage.root, 'What the app shows');

  let authToken: string | null = 'token-0';
  let refreshCount = 0;
  const showHeld = (): void => held.set([['token held', authToken ?? '-'], ['refreshes', String(refreshCount)]]);
  showHeld();

  const refreshToken = async (): Promise<string> => {
    refreshCount++;
    // A plain client for the renewal: going through `api` would hit the same 401 handler.
    const { token } = await wretch(BASE).fetchPolyfill(server.fetch).post({}, '/token').json<{ token: string }>();
    showHeld();
    return token;
  };

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .addon(BasicAuthAddon)
    // Runs before every request, so whatever token is held right now gets used.
    .defer((req) => (authToken ? req.basicAuth('user', authToken) : req))
    .resolve((chain) =>
      chain.unauthorized(async (_error, request) => {
        w.note('401: the token expired, asking for a new one', 'warn');
        authToken = await refreshToken();
        // The replay clears the resolvers (no 401 handler left, so no loop); .fetch() runs the defer again.
        return request
          .resolve((c) => c, true)
          .fetch()
          .json();
      }),
    );

  const openInbox = async (): Promise<void> => {
    shown.clear('Loading…');
    stage.say(`GET /inbox with ${authToken}`);
    const inbox = (await api.get('/inbox').json().catch(() => null)) as { unread: number } | null;
    if (stage.disposed) return;
    showHeld();
    shown.show(inbox ? `${inbox.unread} unread messages` : 'Could not open the inbox', inbox ? 'ok' : 'bad');
    stage.say(inbox ? `The inbox opened with ${authToken}` : 'Even the new token was refused', inbox ? 'ok' : 'bad');
  };

  runCases(stage, [
    {
      label: 'Open inbox (token-0 expired)',
      run: () => {
        // Start over: the app holds the old token again and the server wants token-1.
        [current, authToken, refreshCount] = [1, 'token-0', 0];
        w.clear();
        return openInbox();
      },
    },
    { label: 'Open inbox again', run: openInbox },
    {
      label: 'Server retires the token',
      run: async () => {
        current++;
        stage.say(`The server now only accepts token-${current}`, 'warn');
        await stage.wait(900);
        await openInbox();
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
