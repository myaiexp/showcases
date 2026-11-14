// A beforeRequest hook returns a new Request: the same call, a different address
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let token = 's3cret';
  const { stage, api, lane, seen, result, go } = hookScene(el, ctx, {
    hint: 'Your code asks for /report. The hook decides what address is really sent.',
    routes: { '/report': (req) => (req.url.searchParams.get('token') ? { json: { rows: 128 } } : { status: 403, json: { error: 'token needed' } }) },
  });
  seen('Server received', { headers: [], body: false });
  const out = result();

  const again = go(async () => {
    stage.say("Your code asks for '/report' and nothing else…");
    const got = await attempt(stage, out, () =>
      api
        .get('https://stats.example/report', {
          retry: 0,
          hooks: lane.hooks({
            beforeRequest: [
              ({ request }) => {
                const url = new URL(request.url);
                url.searchParams.set('token', token);
                lane.note('beforeRequest', 'new address with ?token');
                // Returning a Request replaces the one about to be sent.
                return new Request(url, request);
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'The hook rewrote the address on its way out, so the server let it in.' : 'No token in the address: refused.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) textInput(stage.bar!, 'token', token, (v) => ((token = v), again()), 8);
  return stage.dispose;
};

export default mount;
