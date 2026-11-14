// One logging middleware sees every request leave and every answer arrive
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { logTo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every call goes through the same middleware. It writes to the console box.' });
  const server = createServer(stage, {
    'GET /posts/1': () => ({ json: { title: 'Morning light over the lake' } }),
    'GET /posts/99': () => ({ status: 404, json: { error: 'No such post' } }),
    'GET /posts/lost': () => ({ network: true }),
  });
  const consoleBox = pane(stage.root, 'console');
  const log = logTo(stage, consoleBox);
  const shown = screen(stage.root, 'What the app shows');
  const short = (url: string): string => url.replace(BASE, '');

  const loggingMiddleware = (next: (url: string, opts: RequestInit) => Promise<Response>) => async (url: string, opts: RequestInit) => {
    log(`→ ${opts.method || 'GET'} ${short(url)}`, 'info');
    try {
      const response = await next(url, opts);
      // An answer arrived: even a 404 is "✓" here, because the request itself worked.
      log(`✓ ${response.status} ${short(url)}`, response.ok ? 'ok' : 'warn');
      return response;
    } catch (error) {
      log(`✗ Request failed: ${short(url)}`, 'bad');
      throw error;
    }
  };

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([loggingMiddleware]);

  const open = async (id: string, after: string): Promise<void> => {
    shown.clear('Loading…');
    stage.say(`api.get("/posts/${id}").json()`);
    await api
      .get(`/posts/${id}`)
      .notFound(() => shown.show('Post not found', 'warn'))
      .json((post: { title: string }) => shown.show(post.title, 'ok'))
      .catch(() => {
        if (!stage.disposed) shown.show('Cannot reach the server', 'bad');
      });
    if (!stage.disposed) stage.say(after, id === '1' ? 'ok' : 'warn');
  };

  runCases(stage, [
    { label: 'A post that exists', run: () => open('1', 'Out and back: an arrow and a tick') },
    { label: 'A post that does not (404)', run: () => open('99', 'A 404 still gets a tick: the trip worked, the answer just said no') },
    { label: 'Connection lost', run: () => open('lost', 'No answer at all is the only thing that earns a cross') },
  ]);
  return () => stage.dispose();
};

export default mount;
