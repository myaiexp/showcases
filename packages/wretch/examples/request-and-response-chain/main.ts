// The README's chain: describe the request, send it, handle the answer
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { chips } from '../../shared/chips.ts';
import { select } from '../../shared/controls.ts';
import { BASE, createServer, statusText } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const ANSWERS = [201, 400, 401] as const;
const REQUEST = ['.headers()', '.query()', '.json(body)', '.post()'];
const SENT = ['fetch is called'];
const RESPONSE = ['.badRequest()', '.unauthorized()', '.json()'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose the answer the simulated server gives, then watch the chain run.' });
  let answer: number = 201;
  const server = createServer(stage, {
    'POST /users': () => (answer === 201 ? { status: 201, json: { id: 7, name: 'Alice' } } : { status: answer, json: { error: 'no' } }),
  });
  wire(stage, server, { rows: 0 });
  const first = chips(stage.root, REQUEST, '1 · Describe the request');
  const middle = chips(stage.root, SENT, '2 · wretch sends it');
  const last = chips(stage.root, RESPONSE, '3 · Handle the answer');

  // `.query()` comes from QueryStringAddon: the README's chaining example leaves the addon out.
  // The address is the base URL here: the README writes `.post("/users")` after `.json()`, but
  // .post()'s first argument is the body, so that string would be sent as the body, not as the path.
  const api = wretch(`${BASE}/users`).fetchPolyfill(server.fetch).addon(QueryStringAddon);

  stage.onDispose(
    server.on((e) => {
      if (e.type === 'request') middle.fire('fetch is called', 'info');
    }),
  );

  let latest = 0;
  const run = async (): Promise<void> => {
    const mine = ++latest;
    const current = (): boolean => mine === latest && !stage.disposed;
    first.reset();
    middle.reset();
    last.reset();
    stage.say(`The server will answer ${answer} ${statusText(answer)}`);
    // The first half only describes the request, so it runs instantly; the lights replay its order.
    for (const name of REQUEST) {
      first.fire(name, 'info', '', true);
      await stage.wait(stage.preview ? 150 : 250);
      if (!current()) return;
    }
    // The whole chain, written once. Nothing leaves until .post() is called.
    await api
      .headers({ 'X-Api-Key': 'secret' })
      .query({ limit: 10 })
      .json({ name: 'Alice', role: 'admin' })
      .post()
      .badRequest(() => {
        if (!current()) return;
        last.fire('.badRequest()', 'warn');
        stage.say('400: the answer went to .badRequest() and .json() was skipped', 'warn');
      })
      .unauthorized(() => {
        if (!current()) return;
        last.fire('.unauthorized()', 'warn');
        stage.say('401: the answer went to .unauthorized() and .json() was skipped', 'warn');
      })
      .json(() => {
        if (!current()) return;
        last.fire('.json()', 'ok');
        stage.say('201: no catcher matched, so .json() read the new user', 'ok');
      });
  };
  const safe = (): void => void run().catch(() => {});

  if (stage.bar) {
    select(stage.bar, 'Server answers', ANSWERS.map((s) => [s, `${s} ${statusText(s)}`] as const), (s) => {
      answer = s;
      safe();
    });
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const s of ANSWERS) {
        answer = s;
        await run();
        await wait(1500);
      }
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
