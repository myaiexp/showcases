// One client, three requests: each inherits the login header and the 403 rule
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { chips } from '../../shared/chips.ts';
import { button } from '../../shared/controls.ts';
import { envelope } from '../../shared/envelope.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CALLS = ['GET /posts/1', 'POST /posts', 'GET /vault'] as const;
const TOKEN = 'MY_SECRET_TOKEN';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three different requests, one client. Run them in any order.' });
  const server = createServer(stage, {
    'GET /posts/1': () => ({ json: { id: 1, title: 'Morning light over the lake' } }),
    'POST /posts': () => ({ status: 201, json: { id: 101 } }),
    'GET /vault': () => ({ status: 403, json: { error: 'Members only' } }),
  });
  const calls = chips(stage.root, CALLS, 'Requests made from the same client');
  const sent = envelope(stage, { title: 'What the server received', headers: ['authorization', 'if-unmodified-since', 'content-type'] });
  const options = document.createElement('div');
  options.className = 'options';
  stage.root.append(options);
  const off = server.on((e) => {
    if (e.type !== 'request') return;
    sent.show(e.req);
    const { credentials, mode } = e.req.init;
    options.textContent = `fetch options: credentials ${String(credentials)}, mode ${String(mode)}`;
  });
  stage.onDispose(off);

  // The client: set up once. Every request below starts from this.
  const externalApi = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .auth(`Bearer ${TOKEN}`)
    .options({ credentials: 'include', mode: 'cors' })
    .resolve((w) => w.forbidden(() => stage.say('The server said 403: the one rule on the client showed "Members only"', 'warn')));

  const run = async (i: number): Promise<void> => {
    const name = CALLS[i]!;
    calls.fire(name, 'info');
    if (i === 0) {
      stage.say('Fetching a post: the client adds a header of its own for this one call');
      await externalApi
        .headers({ 'If-Unmodified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT' })
        .get('/posts/1')
        .json(() => stage.say('Got the post. The login header came from the client, the date header from this call', 'ok'));
    } else if (i === 1) {
      stage.say('Posting a new resource: the client adds the address, the call adds the body');
      await externalApi
        .url('/posts')
        .post({ title: 'Shiny new' })
        .json(() => stage.say('Created. The same login header went along, nobody wrote it again', 'ok'));
    } else {
      stage.say('Asking for a members-only page');
      await externalApi.get('/vault').json();
    }
    if (!stage.disposed) calls.fire(name, i === 2 ? 'warn' : 'ok', '', true);
  };
  const safe = (i: number): void => void run(i).catch(() => {});

  if (stage.bar) CALLS.forEach((c, i) => button(stage.bar!, c, () => safe(i)));
  if (stage.preview) {
    stage.play(async (wait) => {
      for (let i = 0; i < CALLS.length; i++) {
        await run(i);
        await wait(1500);
      }
    });
  } else safe(0);
  return () => stage.dispose();
};

export default mount;
