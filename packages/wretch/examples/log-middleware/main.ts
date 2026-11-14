// A hand-written middleware: log the request, then hand it to next()
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { logTo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The logger only looks: the box shows what it saw, the panel shows what the server got.' });
  const server = createServer(stage, {
    'GET /posts/1': () => ({ json: { title: 'Morning light over the lake' } }),
    'GET /posts': () => ({ json: [{ title: 'Morning light over the lake' }, { title: 'A field guide to pine cones' }] }),
    'POST /posts': () => ({ status: 201, json: { id: 7 } }),
  });
  wire(stage, server, { rows: 0 });
  const consoleBox = pane(stage.root, 'console.log');
  const log = logTo(stage, consoleBox);
  const shown = screen(stage.root, 'What the app shows');
  if (!stage.preview) envelope(stage, { headers: ['content-type'] }).follow(server);

  // A middleware takes the next step and returns a function with the same shape as fetch.
  // Whatever it passes on to next(url, opts) is what the server finally receives.
  const logMiddleware: ConfiguredMiddleware = (next) => (url, opts) => {
    log(`${opts.method}@${url.replace(BASE, '')}`, 'info');
    return next(url, opts);
  };

  const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([logMiddleware]);

  const ask = async (say: string, request: Promise<unknown>): Promise<void> => {
    consoleBox.clear();
    shown.clear('Loading…');
    stage.say(say);
    const result = await request.catch(() => null);
    if (stage.disposed) return;
    shown.show(result ? JSON.stringify(result) : 'Failed', result ? 'ok' : 'bad');
    stage.say('The logger wrote its line before the request left, and changed nothing about it', 'ok');
  };

  runCases(stage, [
    { label: 'GET one post', run: () => ask('api.get("/posts/1").json()', api.get('/posts/1').json()) },
    { label: 'GET with a query', run: () => ask('api.get("/posts?userId=1").json()', api.get('/posts?userId=1').json()) },
    { label: 'POST a new post', run: () => ask('api.post({ title: "Hi" }, "/posts").json()', api.post({ title: 'Hi' }, '/posts').json()) },
  ]);
  return () => stage.dispose();
};

export default mount;
