// .auth() sets the Authorization header; without it the server says 401
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same page, asked for with and without a login.' });
  const server = createServer(stage, {
    'GET /account': (req) =>
      req.headers.get('authorization') === 'Bearer s3cret-token'
        ? { json: { name: 'Aino Virtanen', balance: '1 240 €' } }
        : { status: 401, json: { error: 'Please log in' } },
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['authorization'] });
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const open = async (token: string | null): Promise<void> => {
    stage.say(token ? `.auth("${token}").get("/account")` : '.get("/account")');
    const request = token ? api.auth(token) : api;
    await request
      .get('/account')
      .unauthorized(() => {
        shown.show('Please log in to see your account', 'warn');
        stage.say('The server said 401: no valid login came with the request', 'warn');
      })
      .json((account: { name: string; balance: string }) => {
        shown.show(`${account.name}\nBalance: ${account.balance}`, 'ok');
        stage.say('The login was accepted: private data came back', 'ok');
      })
      .catch(() => {});
    if (!stage.disposed) seen.show(server.requests.at(-1)!);
  };

  runCases(stage, [
    { label: 'Without .auth()', run: () => open(null) },
    { label: 'With .auth()', run: () => open('Bearer s3cret-token') },
    { label: 'Wrong token', run: () => open('Bearer guess') },
  ]);
  return () => stage.dispose();
};

export default mount;
