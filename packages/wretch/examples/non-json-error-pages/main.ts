// A failed answer may be JSON, HTML or text: read it by its Content-Type
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { kv, screen } from '../../shared/screen.ts';
import { BASE, createServer, type Reply } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const FAILURES: Record<string, Reply> = {
  api: { status: 422, json: { message: 'The title is required' } },
  proxy: { status: 502, html: '<html><head><title>502</title></head><body><h1>502 Bad Gateway</h1><hr>nginx</body></html>' },
  plain: { status: 503, text: 'Down for maintenance until 14:00' },
};

const BRANCHES = ['application/json', 'text/html', 'anything else'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three failures, three kinds of body. The same handler copes with all of them.' });
  const server = createServer(stage, { 'POST /posts/:who': (req) => FAILURES[req.params['who']!]! });
  wire(stage, server, { rows: 0 });
  const seen = kv(stage.root, 'What came back');
  const branch = chips(stage.root, BRANCHES, 'Which branch ran');
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .customError(async (error, response) => {
      const contentType = response.headers.get('content-type') || '';
      let body: unknown;
      if (contentType.includes('application/json')) {
        body = await response.json();
        branch.fire('application/json', 'info', 'read it with response.json()');
      } else if (contentType.includes('text/html')) {
        body = await response.text();
        branch.fire('text/html', 'warn', 'a web page, not a message: do not show it as is');
      } else {
        body = await response.text();
        branch.fire('anything else', 'info', 'read it with response.text()');
      }
      return { ...error, body, contentType };
    });

  const send = async (who: string): Promise<void> => {
    branch.reset();
    shown.clear('Saving…');
    stage.say(`POST /posts/${who}: the server fails`);
    await api
      .post({ title: '' }, `/posts/${who}`)
      .res()
      .catch((error: { status: number; body: unknown; contentType: string }) => {
        if (stage.disposed) return;
        const isPage = error.contentType.includes('text/html');
        seen.set([
          ['status', String(error.status)],
          ['type', error.contentType.split(';')[0]!],
          ['body', isPage ? `(${String(error.body).length} characters of HTML)` : JSON.stringify(error.body)],
        ]);
        const friendly = isPage ? 'The site is having trouble. Please try again in a minute.' : String((error.body as { message?: string }).message ?? error.body);
        shown.show(friendly, isPage ? 'bad' : 'warn');
        stage.say(isPage ? 'An HTML error page would have broken response.json(); the type told us not to try' : 'The body was read the way its type said', isPage ? 'warn' : 'ok');
      });
  };

  runCases(stage, [
    { label: 'API says no (JSON)', run: () => send('api') },
    { label: 'Proxy breaks (HTML)', run: () => send('proxy') },
    { label: 'Maintenance (text)', run: () => send('plain') },
  ]);
  return () => stage.dispose();
};

export default mount;
