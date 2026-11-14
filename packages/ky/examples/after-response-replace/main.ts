// An afterResponse hook returns a different Response for the page
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt, notes } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let convert = true;
  const { stage, api, lane, result, go } = hookScene(el, ctx, {
    hint: 'The server only knows Fahrenheit. The hook gives your page Celsius.',
    routes: { '/now': { json: { city: 'Oulu', temp_f: 14 } } },
  });
  const row = stage.row();
  const sent = notes(row, 'Server sent');
  const out = result('Your code got');

  const again = go(async () => {
    sent.pending('nothing yet');
    stage.say('Asking for the weather in Oulu…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://weather.example/now', {
          retry: 0,
          hooks: lane.hooks({
            afterResponse: [
              async ({ response }) => {
                const data = (await response.json()) as { city: string; temp_f: number };
                sent.set([[JSON.stringify(data), 'warn']]);
                if (!convert) return;
                lane.note('afterResponse', 'swapped the answer');
                // Whatever Response is returned here is what your code receives.
                const celsius = { city: data.city, temp_c: Math.round(((data.temp_f - 32) * 5) / 9) };
                return new Response(JSON.stringify(celsius), { status: response.status, headers: { 'content-type': 'application/json' } });
              },
            ],
          }),
        })
        .json(),
    );
    if (got.ok) stage.say(convert ? 'The server said 14 °F; your page got -10 °C.' : 'No hook: your page got the server\'s answer as it was.', 'ok');
  });
  if (!stage.preview) checkbox(stage.bar!, 'convert in the hook', true, (v) => ((convert = v), again()));
  return stage.dispose;
};

export default mount;
