// retry({ maxAttempts }): after that many retries wretch stops and rejects
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  // The server is down for good: every answer is 503.
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Pick how many retries are allowed, then send.',
    routes: { 'GET /posts/1': () => ({ status: 503, json: { error: 'Down for maintenance' } }) },
    span: ctx.preview ? 1500 : 3000,
    latency: ctx.preview ? 120 : 250,
  });
  const out = pane(stage.root, 'What the app shows');
  let tries = 3;

  const run = solo(async () => {
    tl.reset();
    out.clear();
    // Cards use short waits so the loop stays quick.
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([retry({ maxAttempts: tries, delayTimer: stage.preview ? 100 : 300 })]);
    stage.say(`Retries allowed: ${tries}. The server will say 503 every time.`);
    // Not a 503 handler: retry gave up first, so the failure is its own Error.
    const post = await api.get('/posts/1').json().catch((err: Error) => {
      if (!stage.disposed) out.add(`Sorry, try later (${err.message})`, 'bad');
      return null;
    });
    if (stage.disposed || post) return;
    stage.say(`Gave up: ${server.requests.length} requests, the first try plus ${tries} retries`, 'bad');
  });

  if (stage.bar) {
    slider(stage.bar, 'Retries allowed', 1, 5, 1, tries, (v) => (tries = v));
    button(stage.bar, 'Send request', () => void run());
  }
  let n = 0;
  runScript(stage, async (wait) => {
    if (stage.preview) tries = n++ % 2 === 0 ? 2 : 4;
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
