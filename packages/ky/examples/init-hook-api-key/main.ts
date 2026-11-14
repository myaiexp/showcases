// An init hook puts the same apiKey in every address the client calls
import type { Mount } from '@/types.ts';
import { checkbox, textInput } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  let key = 'k-8d41';
  let useHook = true;
  const { stage, api, lane, seen, trail, go } = hookScene(el, ctx, {
    hint: 'Three different calls. Turn the hook off and the map service turns every one away.',
    // The service answers only when the address carries an apiKey.
    routes: { '*': (req) => (req.url.searchParams.get('apiKey') ? { json: { ok: true } } : { status: 401, json: { error: 'apiKey missing' } }) },
  });
  seen('Server received', { headers: [], body: false });
  trail('Answers');

  const again = go(async () => {
    const maps = api.extend({
      prefix: 'https://maps.example/v1',
      retry: 0,
      hooks: useHook
        ? lane.hooks({
            init: [
              (options) => {
                // Runs before each request is built: the key joins that call's search params.
                options.searchParams = { apiKey: key };
                lane.note('init', 'added ?apiKey=…');
              },
            ],
          })
        : {},
    });
    for (const place of ['places', 'routes', 'traffic']) {
      stage.say(`maps.get('${place}'): no key written in the call`);
      // Each call is plain: the key is not mentioned here.
      await maps.get(place).json().catch(() => undefined);
      await stage.wait(250);
    }
    stage.say(useHook ? 'The hook added the key three times; the calls never mention it.' : 'No hook, no key: all three were refused.', useHook ? 'ok' : 'bad');
  });
  if (!stage.preview) {
    textInput(stage.bar!, 'apiKey', key, (v) => (key = v), 8);
    checkbox(stage.bar!, 'add the key in an init hook', true, (v) => {
      useHook = v;
      again();
    });
  }
  return stage.dispose;
};

export default mount;
