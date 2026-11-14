// dedupe({ resolver }): what the callers that waited for the first answer receive
import wretch from 'wretch';
import { dedupe } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findPost } from '../../shared/data.ts';
import { callers, mwScene, solo, volley } from '../../shared/mwscene.ts';
import { BASE } from '../../shared/server.ts';

type Resolver = NonNullable<NonNullable<Parameters<typeof dedupe>[0]>['resolver']>;

// A copy with one extra header; clone() gives it a body of its own to read.
const labelled: Resolver = (response) =>
  new Response(response.clone().body, {
    status: response.status,
    statusText: response.statusText,
    headers: [...response.headers, ['x-shared-copy', 'yes']],
  });
// Everyone gets the same Response object: only one reader can use its body.
const same: Resolver = (response) => response;

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Three merged calls; the resolver decides what the two that waited receive.',
    routes: { 'GET /posts/1': () => ({ json: findPost(1) }) },
    span: ctx.preview ? 1000 : 1500,
    latency: ctx.preview ? 300 : 450,
  });
  const screens = callers(stage, 3);
  const gap = stage.preview ? 60 : 120;

  const go = solo(async (title: string, resolver?: Resolver) => {
    tl.reset();
    screens.forEach((s) => s.clear());
    stage.say(title);
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares([dedupe({ resolver })]);
    await volley(stage, tl, 3, gap, (i) =>
      api
        .get('/posts/1')
        .res(async (res) => {
          const post = (await res.json()) as { title: string };
          const copy = res.headers.get('x-shared-copy');
          // Cards say only which copy it was, to stay short.
          screens[i]!.show(`${stage.preview ? '' : `${post.title} `}${copy ? '(shared copy)' : '(original)'}`, 'ok');
        })
        .catch((err: Error) => screens[i]!.show(stage.preview ? 'unreadable' : `Could not read it: ${err.message}`, 'bad')),
    );
  });

  runCases(stage, [
    { label: 'Default (clone)', run: () => go('Default resolver: each waiting caller gets a clone') },
    { label: 'Labelled copy', run: () => go('Custom resolver: the copies carry an extra header', labelled) },
    { label: 'Same object', run: () => go('Careless resolver: everyone gets the same Response', same) },
  ], 1900);
  return () => stage.dispose();
};

export default mount;
