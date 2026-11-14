// afterResponse compares retryCount with retry.limit: warn on the last try
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { logView } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  let recoversOn = 9; // the try on which the server starts working (9 = never)
  let runs = 0;
  const { stage, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'Ky tries up to 3 times. Choose when the server recovers and watch which tries raise a notice.',
    routes: { '/sync': (req) => (req.n >= recoversOn ? { json: { synced: true } } : { status: 503 }) },
  });
  const row = stage.row();
  const toasts = logView(row, 'Notices the user sees', stage.preview ? 4 : 6);
  const out = fullResult();

  const again = go(async () => {
    toasts.clear();
    if (stage.preview) recoversOn = runs++ % 2 ? 9 : 2;
    stage.say('Syncing…');
    const got = await attempt(stage, out, () =>
      api
        .post('https://notes.example/sync', {
          retry: { limit: 2, methods: ['post'], delay: () => 250 },
          hooks: lane.hooks({
            afterResponse: [
              ({ response, retryCount, options }) => {
                if (response.ok) return;
                if (retryCount === options.retry.limit) {
                  toasts.add(`Sync failed (try ${retryCount + 1}). Check your connection.`, 'bad');
                  lane.note('afterResponse', 'last try: warned', 'bad');
                } else {
                  lane.note('afterResponse', `try ${retryCount + 1} failed, quiet`);
                }
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'It recovered before the last try, so the user never saw a notice.' : 'Only the final failure raised a notice.', got.ok ? 'ok' : 'warn');
  });
  if (!stage.preview) slider(stage.bar!, 'server works from try', 1, 4, 1, 4, (v) => ((recoversOn = v), again()), (v) => (v === 4 ? '4 (never)' : String(v)));
  return stage.dispose;
};

export default mount;
