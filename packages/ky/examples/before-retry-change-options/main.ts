// beforeRetry returns {options: {timeout}}: later tries wait longer
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  let patience = 2000; // the timeout the hook gives later tries, ms
  const { stage, server, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'The report takes about 1 second to build. The first try only waits half a second.',
    routes: { '/report': { json: { pages: 12 }, delay: 700 } },
  });
  const times = timeline(stage.root, server, stage.signal, { span: stage.preview ? 3000 : 4000 });
  const out = fullResult();

  const again = go(async () => {
    times.reset();
    stage.say('Asking for the report; the first try waits 0.5 s…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://reports.example/report', {
          timeout: 500,
          retry: { limit: 1, retryOnTimeout: true, delay: () => 300 },
          hooks: lane.hooks({
            beforeRetry: [
              () => {
                lane.note('beforeRetry', `timeout is now ${patience / 1000} s`);
                // Applies to this retry and any after it.
                return { options: { timeout: patience } };
              },
            ],
          }),
        })
        .json(),
    );
    if (!got.ok) times.mark('gave up', 'bad');
    stage.say(got.ok ? 'First try timed out; the retry had more time and got the report.' : 'The retry also ran out of time.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) slider(stage.bar!, 'timeout for the retry', 600, 2000, 200, patience, (v) => ((patience = v), again()), (v) => `${v / 1000} s`);
  return stage.dispose;
};

export default mount;
