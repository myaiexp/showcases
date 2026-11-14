// beforeRetry returns a saved Response once enough tries have failed
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let failures = 2; // tries to make before settling for the copy
  const saved = { city: 'Oulu', temp: -7, note: 'saved copy from this morning' };
  const { stage, api, lane, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'The weather server is down. Choose how many failed tries before the hook hands over the saved copy.',
    routes: { '/forecast': { status: 503 } },
  });
  trail('Trips');
  const out = fullResult();

  const again = go(async () => {
    stage.say('The server is down. Asking for the forecast…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://weather.example/forecast', {
          retry: { limit: 4, delay: () => 200 },
          hooks: lane.hooks({
            beforeRetry: [
              ({ retryCount }) => {
                lane.note('beforeRetry', retryCount >= failures ? 'gave the saved copy' : `try ${retryCount + 1} is on`, retryCount >= failures ? 'ok' : undefined);
                // Returning a Response ends the retrying: Ky uses it as the answer.
                if (retryCount >= failures) return Response.json(saved);
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? `${failures} failed ${failures === 1 ? 'try' : 'tries'}, then the saved copy: the page still shows a forecast.` : 'No copy, no answer.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) slider(stage.bar!, 'failed tries before the copy', 1, 3, 1, failures, (v) => ((failures = v), again()));
  return stage.dispose;
};

export default mount;
