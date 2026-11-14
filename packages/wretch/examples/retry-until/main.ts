// retry({ until }): keep asking until the answer itself says the job is done
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const STAGES = ['queued', 'working', 'working', 'done'];

const mount: Mount = (el, ctx) => {
  // Every answer is a 200; only the text inside changes.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Check on the job. Every answer is a 200, so only its content tells the story.',
    routes: {
      'GET /jobs/7': (req) => ({ json: { status: STAGES[Math.min(req.attempt, STAGES.length) - 1] } }),
    },
    span: ctx.preview ? 1500 : 3000,
    latency: ctx.preview ? 100 : 200,
  });
  const out = pane(stage.root, 'Checks');
  server.on((e) => {
    if (e.type === 'response') out.add(`Check ${e.req.attempt}: ${STAGES[Math.min(e.req.attempt, STAGES.length) - 1]}`, e.req.attempt >= STAGES.length ? 'ok' : 'warn');
  });

  // The answer is a Response; clone() lets until read the body without using it up.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([
      retry({
        delayTimer: stage.preview ? 100 : 300,
        until: (response) => response!.clone().json().then((body: { status: string }) => body.status === 'done'),
      }),
    ]);

  const run = solo(async () => {
    tl.reset();
    out.clear();
    stage.say('Asking for job 7 until it is done');
    const job = await api.get('/jobs/7').json<{ status: string }>().catch(() => null);
    if (stage.disposed) return;
    if (job) stage.say(`The job is ${job.status} after ${server.requests.length} checks, and the app only saw the last answer`, 'ok');
  });

  if (stage.bar) button(stage.bar, 'Check again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
