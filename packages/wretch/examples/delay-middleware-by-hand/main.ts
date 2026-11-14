// delayMiddleware(ms): one recipe, two settings, two clients
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, slider } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { mwScene, solo } from '../../shared/mwscene.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Two clients, one middleware recipe, two different waits. Both ask at the same moment.',
    routes: { 'GET /posts/:id': (req) => ({ json: findPost(req.params['id']!) }) },
    span: ctx.preview ? 1500 : 2500,
    latency: ctx.preview ? 200 : 250,
  });
  const [quickCol, slowCol] = columns(stage.root, 2);
  const quickScreen = screen(quickCol!, 'quick client', '…');
  const slowScreen = screen(slowCol!, 'slow client', '…');
  let slowMs = stage.preview ? 900 : 1500;

  // The number is baked in by the outer function; the inner two are the middleware itself.
  const delayMiddleware =
    (delay: number): ConfiguredMiddleware =>
    (next) =>
    (url, opts) =>
      new Promise((resolve) => setTimeout(() => resolve(next(url, opts)), delay));

  const run = solo(async () => {
    tl.reset();
    quickScreen.clear('Waiting…');
    slowScreen.clear('Waiting…');
    const quick = wretch(BASE).fetchPolyfill(server.fetch).middlewares([delayMiddleware(100)]);
    const slow = wretch(BASE).fetchPolyfill(server.fetch).middlewares([delayMiddleware(slowMs)]);
    stage.say(`delayMiddleware(100) and delayMiddleware(${slowMs}), asked at the same moment`);
    tl.mark('both ask');
    const t0 = performance.now();
    const ask = (api: typeof quick, id: number, out: typeof quickScreen): Promise<void> =>
      api
        .get(`/posts/${id}`)
        .json<{ title: string }>()
        .then((post) => {
          if (!stage.disposed) out.show(`${post.title} (${Math.round(performance.now() - t0)} ms)`, 'ok');
        })
        .catch(() => {});
    await Promise.all([ask(quick, 1, quickScreen), ask(slow, 2, slowScreen)]);
    if (!stage.disposed) stage.say('Same recipe, two settings: each client held its own request back by its own amount', 'ok');
  });

  if (stage.bar) {
    slider(stage.bar, 'Slow client waits', 200, 2000, 100, slowMs, (v) => (slowMs = v), (v) => `${v} ms`);
    button(stage.bar, 'Ask again', () => void run());
  }
  runScript(stage, async (wait) => {
    await run();
    await wait(1400);
  });
  return () => stage.dispose();
};

export default mount;
