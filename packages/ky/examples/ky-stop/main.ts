// beforeRetry returns ky.stop: Ky quits quietly and your code gets undefined
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

type Mode = 'stop' | 'stop-json' | 'plain';
const MODES = [
  ['stop', 'hook returns ky.stop'],
  ['stop-json', 'ky.stop, then .json()'],
  ['plain', 'hook does nothing'],
] as const;

const mount: Mount = (el, ctx) => {
  let mode: Mode = 'stop';
  let runs = 0;
  const { stage, api, lane, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'A "page viewed" ping to a server that is down. Retrying it is pointless.',
    routes: { 'POST /ping': { status: 503 } },
  });
  trail('Pings sent');
  const out = fullResult();

  const again = go(async () => {
    if (stage.preview) mode = runs++ % 2 ? 'plain' : 'stop';
    stage.say('Sending the "page viewed" ping to a server that is down…');
    const got = await attempt(
      stage,
      out,
      async () => {
        const call = api.post('https://stats.example/ping', {
          json: { page: '/home' },
          retry: { limit: 3, methods: ['post'], delay: () => 200 },
          hooks: lane.hooks({
            beforeRetry: [
              () => {
                if (mode === 'plain') return;
                lane.note('beforeRetry', 'returned ky.stop', 'ok');
                // Stops the retrying; the call resolves with no response at all.
                return ky.stop;
              },
            ],
          }),
        });
        // A body shortcut needs a response, and there is none: it throws a TypeError.
        return mode === 'stop-json' ? call.json() : call;
      },
      (r) => r,
    );
    stage.say(
      got.ok
        ? 'Ky stopped after 1 ping; the call returned undefined and nothing broke.'
        : mode === 'stop-json'
          ? '.json() needs a response, and ky.stop leaves none: that throws.'
          : 'Without the hook Ky kept pinging until it ran out of tries, then threw.',
      got.ok ? 'ok' : 'warn',
    );
  });
  if (!stage.preview) select(stage.bar!, 'Try', MODES.map(([v, t]) => [v, t] as const), (v) => ((mode = v), again()));
  return stage.dispose;
};

export default mount;
