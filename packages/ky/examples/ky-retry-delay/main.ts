// ky.retry({delay}) waits exactly as long as the answer's body asked for
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  let askedFor = ctx.preview ? 1 : 2; // seconds the server tells us to wait
  const { stage, server, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'The server answers 200 but the body says "too many requests, wait N seconds".',
    routes: {
      '/search': (req) => (req.n === 1 ? { json: { error: { code: 'RATE_LIMIT', retryAfter: askedFor } } } : { json: { hits: 24 } }),
    },
  });
  const times = timeline(stage.root, server, stage.signal, { span: stage.preview ? 2000 : 4000 });
  const out = fullResult();

  const again = go(async () => {
    times.reset();
    stage.say(`The body will say "wait ${askedFor} s"…`);
    const got = await attempt(stage, out, () =>
      api
        .get('https://shop.example/search', {
          hooks: lane.hooks({
            afterResponse: [
              async ({ response }) => {
                const data = (await response.json()) as { error?: { code: string; retryAfter: number } };
                if (data.error?.code === 'RATE_LIMIT') {
                  lane.note('afterResponse', `asked to wait ${data.error.retryAfter} s`, 'warn');
                  // Custom delays skip Ky's backoff and jitter, so the wait is exactly this.
                  return ky.retry({ delay: data.error.retryAfter * 1000, code: 'RATE_LIMIT' });
                }
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? `The gap between the two bars is the ${askedFor} s the body asked for, not Ky's usual 0.3 s.` : 'Failed.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) slider(stage.bar!, 'body says wait', 1, 3, 1, askedFor, (v) => ((askedFor = v), again()), (v) => `${v} s`);
  return stage.dispose;
};

export default mount;
