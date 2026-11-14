// beforeRequest rebuilds a FormData body: the old content-type must go first
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { rawBodyView } from '../../shared/tip-kit.ts';

const mount: Mount = (el, ctx) => {
  let clean = true;
  let round = 0;
  const { stage, server, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'The form is built with capital field names, and a hook turns them into lowercase ones on the way out. The envelope has a boundary: if the old label stays, it names the wrong one.',
    routes: {
      'POST /order': (req) => {
        // A form can only be read when the label's boundary is the one the body uses.
        const boundary = /boundary=(.+)$/.exec(req.headers.get('content-type') ?? '')?.[1];
        if (!boundary || !req.body.startsWith(`--${boundary}`)) return { status: 400, json: { error: 'Boundary does not match the body' } };
        return { json: { fields: [...req.body.matchAll(/name="([^"]+)"/g)].map((m) => m[1]) } };
      },
    },
  });
  const seen = rawBodyView(stage.row(), 'Server received', { head: !stage.preview });
  const out = fullResult();
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  const run = async (): Promise<void> => {
    seen.show(null);
    // The card shows both outcomes in turn.
    if (stage.preview) clean = round++ % 2 === 0;
    stage.say(clean ? 'Hook renames Food to food, then sends…' : 'Hook renames fields but keeps the old label…');
    const original = new FormData();
    original.append('Food', 'fries');
    original.append('Drink', 'icetea');
    const got = await attempt(stage, out, () =>
      api
        .post('https://diner.example/order', {
          body: original,
          retry: 0,
          hooks: lane.hooks({
            beforeRequest: [
              ({ request }) => {
                // Copy every field across with a lowercase name.
                const renamed = new FormData();
                for (const [key, value] of original) renamed.set(key.toLowerCase(), value);
                // The old content-type names the old boundary: drop it so the new body brings its own.
                if (clean) request.headers.delete('content-type');
                lane.note('beforeRequest', clean ? 'renamed, label reset' : 'renamed, old label kept', clean ? 'ok' : 'warn');
                return new Request(request, { body: renamed });
              },
            ],
          }),
        })
        .json(),
    );
    if (got.ok) stage.say('Lowercase names arrived, and the form is readable.', 'ok');
    else stage.say('Refused (400): the label named another envelope.', 'bad');
  };
  go(run, { pause: 2600 });
  if (!stage.preview) {
    checkbox(stage.bar!, 'delete the old content-type first', true, (v) => {
      clean = v;
    });
  }
  return stage.dispose;
};

export default mount;
