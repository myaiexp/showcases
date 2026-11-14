// redirect: 'manual' plus a middleware: the app learns where it is sent
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { runCases } from '../../shared/cases.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

class RedirectError extends Error {
  override name = 'RedirectError';
  redirectStatus: number;
  location: string;
  constructor(status: number, location: string) {
    super('Redirected');
    this.redirectStatus = status;
    this.location = location;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three pages: a normal one, a moved one and one that needs a login. The page never really leaves.' });
  const server = createServer(stage, {
    'GET /home': () => ({ json: { title: 'Welcome home' } }),
    'GET /old-news': () => ({ status: 301, headers: { location: '/news' } }),
    'GET /orders': () => ({ status: 302, headers: { location: '/login?next=/orders' } }),
  });
  wire(stage, server, { rows: 0 });
  const goes = address(stage.root, 'Where the app is heading');
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    // Do not follow redirects: hand the 301/302 answer back untouched. (A real browser hides the status and
    // Location of such an answer; this simulated server shows them, as Node or Deno would.)
    .options({ redirect: 'manual' })
    .middlewares([
      (next) => async (url, opts) => {
        const response = await next(url, opts);
        if (response.status === 301 || response.status === 302) {
          // The recipe sets window.location.href here. We only report the place.
          throw new RedirectError(response.status, response.headers.get('location') ?? '/');
        }
        return response;
      },
    ])
    .catcher('RedirectError', (thrown) => {
      const error = thrown as unknown as RedirectError;
      goes.set(`${BASE}${error.location}`, 'warn');
      shown.show(`Redirect ${error.redirectStatus}: leaving for ${error.location}`, 'warn');
      stage.say(`The server said ${error.redirectStatus}. The middleware read its Location header and stopped the request`, 'warn');
    });

  const open = async (path: string): Promise<void> => {
    shown.clear('Loading…');
    goes.set(`${BASE}${path}`);
    stage.say(`GET ${path}`);
    await api
      .get(path)
      .json((page: { title: string }) => {
        if (stage.disposed) return;
        shown.show(page.title, 'ok');
        stage.say('No redirect: the page loaded as usual', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Home page', run: () => open('/home') },
    { label: 'Moved page (301)', run: () => open('/old-news') },
    { label: 'Needs login (302)', run: () => open('/orders') },
  ]);
  return () => stage.dispose();
};

export default mount;
