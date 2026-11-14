// A profile page whose three parts want the same user: one request
import wretch from 'wretch';
import { dedupe } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findUser, type User } from '../../shared/data.ts';
import { mwScene } from '../../shared/mwscene.ts';
import { columns, kv, screen } from '../../shared/screen.ts';
import { BASE } from '../../shared/server.ts';

const PARTS = ['header', 'sidebar', 'settings'];

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Three parts of a page each ask for user 1. Then a fourth part opens after the answer is back.',
    routes: { 'GET /users/1': () => ({ json: findUser(1) }) },
    span: 2000,
    latency: ctx.preview ? 350 : 500,
  });
  const parts = columns(stage.root, 3).map((col, i) => screen(col, PARTS[i]!, '…'));
  const count = kv(stage.root, 'The server');

  const reset = (): void => {
    tl.reset();
    parts.forEach((p) => p.clear('…'));
    count.set([['requests received', '0']]);
  };
  const tally = (): void => count.set([['requests received', String(server.requests.length)]]);
  const fill = (i: number) => (user: User) => {
    if (!stage.disposed) parts[i]!.show(user.name.split(' ')[0]!, 'ok');
  };

  const load = async (later: boolean): Promise<void> => {
    reset();
    // Built per run, so dedupe starts with nothing in flight.
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([dedupe()]);
    const ask = (i: number): Promise<unknown> => api.get('/users/1').json<User>().then(fill(i));
    stage.say('Header, sidebar and settings each call api.get("/users/1").json()');
    // The three calls start together; identical GETs on the way share one request.
    await Promise.all([ask(0), ask(1), later ? Promise.resolve() : ask(2)]).catch(() => {});
    if (stage.disposed) return;
    tally();
    if (!later) return stage.say('Three parts filled in, and the server only saw one request', 'ok');
    stage.say('Two parts shared one request. Now the settings part opens, after the answer', 'info');
    await stage.wait(700);
    tl.mark('settings opens');
    await ask(2).catch(() => {});
    if (stage.disposed) return;
    tally();
    stage.say('The first request had finished, so there was nothing to share: a second one went out', 'warn');
  };

  runCases(stage, [
    { label: 'Page loads (three at once)', run: () => load(false) },
    { label: 'Third part opens later', run: () => load(true) },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
