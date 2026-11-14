// A forced retry carries a code and cause that beforeRetry can read
import ky, { isForceRetryError } from 'ky';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt, notes } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let code = 'BAD_PRICE';
  const { stage, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'The first answer has a nonsense price. The hook forces a retry and labels it.',
    // First answer is broken (price is text); the second is fine.
    routes: { '/price': (req) => ({ json: { price: req.n === 1 ? 'N/A' : 4.5 } }) },
  });
  const row = stage.row();
  const saw = notes(row, 'beforeRetry saw');
  const out = fullResult();

  const again = go(async () => {
    saw.pending('nothing yet');
    stage.say('Asking for a price…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://shop.example/price', {
          retry: { limit: 1, delay: () => 250 },
          hooks: lane.hooks({
            afterResponse: [
              async ({ response }) => {
                const data = (await response.json()) as { price: unknown };
                if (typeof data.price !== 'number') {
                  // `code` labels the retry; `cause` keeps the original problem on the error.
                  return ky.retry({ code, cause: new Error(`price was ${JSON.stringify(data.price)}, not a number`) });
                }
              },
            ],
            beforeRetry: [
              ({ error }) => {
                if (!isForceRetryError(error)) return;
                lane.note('beforeRetry', 'read the label');
                saw.set([`message: ${error.message}`, `code: ${error.code}`, `cause: ${(error.cause as Error | undefined)?.message ?? '-'}`]);
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'The hook read why the retry happened: the label travels on the error.' : 'Failed.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) textInput(stage.bar!, 'code', code, (v) => (code = v || 'RETRY'), 14).addEventListener('change', again);
  return stage.dispose;
};

export default mount;
