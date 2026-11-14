// init edits headers on a copy; a body edited in place sticks to your object
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';

type Mode = 'headers' | 'inplace' | 'copy';
const MODES = [
  ['headers', 'init adds to a header'],
  ['inplace', 'init edits the body in place'],
  ['copy', 'init sets a new body'],
] as const;

const mount: Mount = (el, ctx) => {
  let mode: Mode = 'headers';
  let runs = 0;
  const { stage, api, lane, trail, go } = hookScene(el, ctx, {
    hint: 'The same client sends twice. Look at what the second request carries.',
    routes: { 'POST /order': { status: 201 } },
  });
  // One line per request: the thing init touched, as the server received it.
  trail('Server received', (req) => (mode === 'headers' ? `tags: ${req.headers.get('x-tags')}` : `body: ${req.body}`));

  const again = go(async () => {
    if (stage.preview) mode = runs++ % 2 ? 'inplace' : 'headers';
    const form = new URLSearchParams({ item: 'tea' }); // your own object, kept between sends
    const shop = api.extend({
      headers: { 'x-tags': 'base' }, // the client's default header
      hooks: lane.hooks({
        init: [
          (options) => {
            if (mode === 'headers') {
              // Ky gave init its own copy of the headers: this never reaches the next request.
              (options.headers as Record<string, string>)['x-tags'] += '+init'; // init sees a plain object
              lane.note('init', 'header edited (a copy)');
            } else if (mode === 'inplace') {
              // The body is NOT copied: this edits `form` itself.
              (options.body as URLSearchParams).append('gift', 'wrap');
              lane.note('init', 'your form was edited', 'warn');
            } else {
              // A new object is safe: only this request uses it.
              const own = new URLSearchParams(options.body as URLSearchParams);
              own.append('gift', 'wrap');
              options.body = own;
              lane.note('init', 'made a new body');
            }
          },
        ],
      }),
    });
    stage.say(MODES.find((m) => m[0] === mode)![1] + ', then send twice…');
    for (let i = 0; i < 2; i++) {
      await shop.post('https://shop.example/order', { body: form });
      await stage.wait(200);
    }
    stage.say(
      mode === 'headers' ? 'Same header both times: init only changed a copy.' : mode === 'inplace' ? 'The second order has the gift twice: init changed your own form.' : 'Same body both times: a new object keeps your form clean.',
      mode === 'inplace' ? 'warn' : 'ok',
    );
  });
  if (!stage.preview) {
    select(stage.bar!, 'Try', MODES.map(([v, t]) => [v, t] as const), (v) => {
      mode = v;
      again();
    });
  }
  return stage.dispose;
};

export default mount;
