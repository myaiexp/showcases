// dedupe({ key }): choose what makes two requests "the same"
import wretch from 'wretch';
import { dedupe } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { callers, mwScene, solo, volley } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'The same post, asked for with a different "?_=" tag each time.',
    routes: { 'GET /posts/1': () => ({ json: findPost(1) }) },
    span: ctx.preview ? 1000 : 1500,
    latency: ctx.preview ? 300 : 450,
  });
  const screens = callers(stage, 3);

  // The key is a string; two requests with the same key travel together.
  const ignoreTag = (url: string, opts: { method?: string }): string => {
    const address = new URL(url);
    address.searchParams.delete('_');
    return `${opts.method}@${address}`;
  };
  const gap = stage.preview ? 60 : 120;
  const go = solo(async (title: string, middleware: ReturnType<typeof dedupe>) => {
    tl.reset();
    screens.forEach((s) => s.clear());
    stage.say(title);
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([middleware]);
    await volley(stage, tl, 3, gap, (i) =>
      api
        .get(`/posts/1?_=${i + 1}`)
        .json<Post>()
        .then(() => screens[i]!.show(`?_=${i + 1} answered`, 'ok'))
        .catch(() => screens[i]!.show('failed', 'bad')),
    );
    if (stage.disposed) return;
    const n = server.requests.length;
    stage.say(n === 1 ? 'One request: the key ignored the tag, so the calls counted as the same' : `${n} requests: with the default key every address is different`, n === 1 ? 'ok' : 'warn');
  });

  runCases(stage, [
    { label: 'Default key', run: () => go('Default key: method and full address', dedupe()) },
    { label: 'Key without ?_=', run: () => go('Custom key: the ?_= tag is ignored', dedupe({ key: ignoreTag })) },
  ], 1700);
  return () => stage.dispose();
};

export default mount;
