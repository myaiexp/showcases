// .basicAuth() writes the Authorization header from a username and password
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { button, textInput } from '../../shared/controls.ts';
import { kv, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const decode = (b64: string): string => {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
  } catch {
    return '(not valid base64)';
  }
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The simulated server knows one member: aino, with the password s3cret.' });
  const server = createServer(stage, {
    '/private': (req) =>
      decode((req.headers.get('authorization') ?? '').replace(/^Basic /, '')) === 'aino:s3cret'
        ? { json: { welcome: 'Aino' } }
        : { status: 401, json: { error: 'Wrong username or password' } },
  });
  wire(stage, server, { rows: 0 });
  const header = kv(stage.root, 'The header the server received');
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(`${BASE}/private`).fetchPolyfill(server.fetch).addon(BasicAuthAddon);

  const login = async (user: string, pass: string): Promise<void> => {
    stage.say(`.basicAuth("${user}", "${pass}")`);
    shown.clear();
    await api
      .basicAuth(user, pass)
      .get()
      .unauthorized(() => {
        shown.show('Login failed: wrong username or password', 'warn');
        stage.say('401: the header was well formed, but the server did not know that pair', 'warn');
      })
      .json((r: { welcome: string }) => {
        shown.show(`Welcome, ${r.welcome}`, 'ok');
        stage.say('The server decoded the header and accepted the login', 'ok');
      })
      .catch(() => {});
    if (stage.disposed) return;
    const value = server.requests.at(-1)!.headers.get('authorization') ?? '';
    header.set([['Authorization', value], ['decoded', decode(value.replace(/^Basic /, ''))]]);
  };

  if (stage.bar) {
    let user = 'aino';
    let pass = 'wrong';
    textInput(stage.bar, 'Username', user, (v) => (user = v), 8);
    textInput(stage.bar, 'Password', pass, (v) => (pass = v), 8);
    button(stage.bar, 'Log in', () => void login(user, pass));
    void login(user, pass);
  } else {
    runCases(stage, [
      { label: 'Wrong', run: () => login('aino', 'letmein') },
      { label: 'Right', run: () => login('aino', 's3cret') },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
