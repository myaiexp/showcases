// .options({ context }): the middleware writes into an object the caller keeps
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

type Context = Record<string, string | number>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each call hands the middleware its own context object. Watch it fill up.' });
  const server = createServer(stage, {
    'GET /posts/1': () => ({ json: { title: 'Morning light over the lake' } }),
    'GET /posts/99': () => ({ status: 404, json: { error: 'No such post' } }),
  });
  wire(stage, server, { rows: 0 });
  const panel = kv(stage.root, 'context, as your code sees it');
  const shown = screen(stage.root, 'What the app shows');

  // It writes into opts.context if the caller gave one, then carries on as usual.
  const contextMiddleware: ConfiguredMiddleware = (next) => async (url, opts) => {
    const context = (opts as { context?: Context }).context;
    if (!context) return next(url, opts);
    const started = performance.now();
    context['sentTo'] = url.replace(BASE, '');
    const response = await next(url, opts);
    context['status'] = response.status;
    context['tookMs'] = Math.round(performance.now() - started);
    return response;
  };

  const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([contextMiddleware]);

  const ask = async (path: string): Promise<void> => {
    // The object is created before the call and passed by reference, so the same object is read after.
    const context: Context = {};
    panel.set([], '{ } (empty)');
    shown.clear('Loading…');
    stage.say(`api.options({ context }).get("${path}")`);
    await api
      .options({ context })
      .get(path)
      .notFound(() => shown.show('Post not found', 'warn'))
      .json((post: { title: string }) => shown.show(post.title, 'ok'))
      .catch(() => {});
    if (stage.disposed) return;
    panel.set(Object.entries(context).map(([k, v]) => [k, String(v)]));
    stage.say('The middleware never returned this: it wrote it into the object the caller was holding', 'ok');
  };

  runCases(stage, [
    { label: 'A post that exists', run: () => ask('/posts/1') },
    { label: 'A post that does not', run: () => ask('/posts/99') },
  ], 2000);
  return () => stage.dispose();
};

export default mount;
