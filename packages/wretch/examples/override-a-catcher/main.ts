// A request's own .notFound() replaces the base client's 404 catcher
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both requests get a 404. Which handler answers?' });
  const server = createServer(stage, {
    'GET /posts/:id': () => ({ status: 404, json: { error: 'No such post' } }),
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['base .catcher(404)', 'request .notFound()']);
  const shown = screen(stage.root, 'What the app shows');

  // The default for every request: send people to the not-found page.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .catcher(404, () => {
      ran.fire('base .catcher(404)', 'info');
      shown.show('Redirecting to the "page not found" page…', 'info');
    });

  const load = async (own: boolean): Promise<void> => {
    ran.reset();
    shown.clear();
    stage.say(own ? 'api.get("/posts/99").notFound(…): this request has its own handler' : 'api.get("/posts/99"): no handler of its own');
    const request = api.get('/posts/99');
    // The same-named handler on the request wins over the one on the base client.
    await (own
      ? request.notFound(() => {
          ran.fire('request .notFound()', 'ok');
          shown.show('This post was removed. Here are the latest ones instead.', 'ok');
        })
      : request
    )
      .json()
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Use the default', run: () => load(false) },
    { label: 'Override on this request', run: () => load(true) },
  ]);
  return () => stage.dispose();
};

export default mount;
