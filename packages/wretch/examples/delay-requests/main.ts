// delay(ms): every request waits this long before it is sent
import wretch from 'wretch';
import { delay } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';
import { screen } from '../../shared/screen.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Choose how long each request is held back, then ask for the post.',
    routes: { 'GET /posts/1': () => ({ json: findPost(1) }) },
    span: ctx.preview ? 1500 : 2500,
    latency: ctx.preview ? 250 : 300,
  });
  const shown = screen(stage.root, 'What the app shows', 'Nothing asked yet');
  let wait = 1000;

  const run = solo(async () => {
    tl.reset();
    // delay is a middleware factory: the number is baked in, so a new client per wait.
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([delay(wait)]);
    const t0 = performance.now();
    tl.mark('call');
    shown.show('Loading…', 'warn');
    stage.say(`The request is held for ${wait} ms before it is sent`);
    const post = await api.get('/posts/1').json<Post>().catch(() => null);
    if (stage.disposed) return;
    shown.show(post ? post.title : 'Failed', post ? 'ok' : 'bad');
    stage.say(`The answer arrived ${Math.round(performance.now() - t0)} ms after the call: ${wait} ms of holding plus the trip itself`, 'ok');
  });

  if (stage.bar) {
    slider(stage.bar, 'Hold for', 0, 2000, 100, wait, (v) => (wait = v), (v) => `${v} ms`);
    button(stage.bar, 'Ask for the post', () => void run());
  }
  let n = 0;
  runScript(stage, async (w) => {
    if (stage.preview) wait = n++ % 2 === 0 ? 400 : 900;
    await run();
    await w(1400);
  });
  return () => stage.dispose();
};

export default mount;
