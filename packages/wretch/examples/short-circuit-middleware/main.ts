// A middleware that skips next(): an answer for the app, nothing for the server
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ask with the middleware on, then off, and watch whether anything reaches the server.' });
  const server = createServer(stage, { 'GET /posts/1': () => ({ json: { title: 'Morning light over the lake' } }) });
  const w = wire(stage, server, { rows: stage.preview ? 1 : 3 });
  const counter = kv(stage.root, 'The server received');
  const shown = screen(stage.root, 'What the app shows');

  // It does not call next(). Returning a Response ends the chain here, so the request never leaves.
  // wretch expects a Response from fetch, so we build one whose text is the address.
  const shortCircuitMiddleware: ConfiguredMiddleware = () => (url) => Promise.resolve(new Response(url));

  const plain = wretch(BASE).fetchPolyfill(server.fetch);
  const offline = plain.middlewares([shortCircuitMiddleware]);

  const ask = async (label: string, api: typeof plain): Promise<void> => {
    server.reset();
    w.clear();
    counter.set([['requests', '0']]);
    shown.clear('Loading…');
    stage.say(`${label}: api.get("/posts/1").text()`);
    const answer = await api.get('/posts/1').text().catch(() => null);
    if (stage.disposed) return;
    const n = server.requests.length;
    counter.set([['requests', String(n)]]);
    shown.show(answer === null ? 'Failed' : answer.slice(0, 60), answer === null ? 'bad' : 'ok');
    if (n === 0) {
      w.note('nothing left the app', 'dim');
      stage.say('The call finished with an answer, yet the server saw 0 requests: the middleware answered itself', 'ok');
    } else {
      stage.say('Without the middleware the request made the trip and the server answered', 'info');
    }
  };

  runCases(stage, [
    { label: 'Middleware on', run: () => ask('With shortCircuitMiddleware', offline) },
    { label: 'Middleware off', run: () => ask('Without it', plain) },
  ], 2000);
  return () => stage.dispose();
};

export default mount;
