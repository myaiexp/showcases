// All five hooks lit up in the order a request meets them, over a flaky server
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { attempt } from '../../shared/req-kit.ts';
import { hookScene } from '../../shared/hook-kit.ts';

const MODES = [
  ['heals', 'The server fails once, then works'],
  ['dead', 'The server stays down'],
] as const;

const mount: Mount = (el, ctx) => {
  let mode: 'heals' | 'dead' = 'heals';
  let runs = 0;
  const { stage, api, lane, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'Each box is a hook. It lights up when Ky calls it; the line under it says what it did.',
    // Answers 503 "unavailable" first, then (if the server heals) the forecast.
    routes: { '/forecast': (req) => (req.n === 1 || mode === 'dead' ? { status: 503 } : { json: { city: 'Oulu', temp: -3 } }) },
  });
  trail('Answers');
  const out = fullResult();

  const again = go(async () => {
    if (stage.preview) mode = runs++ % 2 ? 'dead' : 'heals'; // cards flip the scenario each loop
    stage.say('Asking for the forecast…');
    const forecast = await attempt(stage, out, () =>
      api
        .get('https://weather.example/forecast', {
          retry: { limit: 1, delay: () => 250 },
          // Every function below is a hook. `lane.hooks` only adds the lighting up.
          hooks: lane.hooks({
            // 1. Before the request is built: change the options (synchronous).
            init: [
              (options) => {
                options.searchParams = { units: 'metric' };
                lane.note('init', 'adds ?units=metric');
              },
            ],
            // 2. The request is built, about to leave: change it, or answer for the server.
            beforeRequest: [
              ({ request }) => {
                request.headers.set('x-app', 'forecast-widget');
                lane.note('beforeRequest', 'adds header x-app');
              },
            ],
            // 3. An answer came back (any status): look at it, or swap it.
            afterResponse: [({ response }) => lane.note('afterResponse', `saw a ${response.status}`, response.ok ? 'ok' : 'warn')],
            // 4. Before each retry, after the pause.
            beforeRetry: [({ retryCount }) => lane.note('beforeRetry', `try number ${retryCount + 1}`)],
            // 5. The request failed for good: last chance to change the error.
            beforeError: [
              ({ error }) => {
                error.message = 'The forecast is unavailable right now.';
                lane.note('beforeError', 'reworded the error', 'bad');
                return error;
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(
      forecast.ok ? 'Failed once, so beforeRetry ran; the second try worked.' : 'Out of tries: beforeError reworded the error your code sees.',
      forecast.ok ? 'ok' : 'warn',
    );
  });

  if (!stage.preview) {
    select(stage.bar!, 'Scenario', MODES.map(([v, t]) => [v, t] as const), (v) => {
      mode = v;
      again();
    });
  }
  return stage.dispose;
};

export default mount;
