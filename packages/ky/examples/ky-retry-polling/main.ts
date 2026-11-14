// afterResponse reads the body and calls ky.retry() while the job says "pending"
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { logView } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  let readyOn = 3; // the try on which the job finishes
  let runs = 0;
  const { stage, api, lane, fullResult, go } = hookScene(el, ctx, {
    hint: 'A report is being built. Every answer is "200 OK": only the body says whether it is ready.',
    routes: { '/jobs/42': (req) => (req.n >= readyOn ? { json: { status: 'done', file: 'report.pdf' } } : { json: { status: 'pending' } }) },
  });
  const row = stage.row();
  const seen = logView(row, 'What each 200 said', stage.preview ? 4 : 6);
  const out = fullResult();

  const again = go(async () => {
    seen.clear();
    if (stage.preview) readyOn = runs++ % 2 ? 9 : 3;
    stage.say('Asking whether the report is ready…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://reports.example/jobs/42', {
          retry: { limit: 4, delay: () => 300 },
          hooks: lane.hooks({
            afterResponse: [
              async ({ response, retryCount }) => {
                const job = (await response.json()) as { status: string };
                seen.add(`try ${retryCount + 1}: 200 OK, "${job.status}"`, job.status === 'done' ? 'ok' : 'warn');
                // The status is fine, but the job is not: ask again (counts against retry.limit).
                if (job.status === 'pending') {
                  lane.note('afterResponse', 'pending: ask again');
                  return ky.retry();
                }
                lane.note('afterResponse', 'done', 'ok');
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'Pending, pending, done: every answer was a 200, the body decided.' : 'Still pending when the retry limit (4) ran out: Ky gives up.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) slider(stage.bar!, 'report ready on try', 1, 7, 1, readyOn, (v) => ((readyOn = v), again()), (v) => (v > 5 ? `${v} (too late)` : String(v)));
  return stage.dispose;
};

export default mount;
