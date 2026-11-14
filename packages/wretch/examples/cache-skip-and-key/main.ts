// throttlingCache({ key, skip }) and skipCache: what is cached, and under what
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { cameFromCache, logTo, mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

type Options = NonNullable<Parameters<typeof throttlingCache>[0]>;

// The language a request asked for, read from its headers.
const language = (opts: { headers?: unknown }): string => new Headers(opts.headers as HeadersInit).get('accept-language') ?? '';

const mount: Mount = (el, ctx) => {
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Each button makes two calls to the same address. Compare what comes back.',
    routes: {
      'GET /greeting': (req) => ({ json: { text: language(req) === 'fi' ? 'Hei maailma' : 'Hello world' } }),
      'GET /live': (req) => ({ json: { text: `Reading #${req.attempt}` } }),
    },
    span: 2000,
    latency: ctx.preview ? 150 : 250,
  });
  const out = pane(stage.root, 'Two calls');
  const log = logTo(stage, out);

  // One run: a fresh cache with `options`, then two calls described by [path, language, skipCache].
  const go = solo(async (title: string, options: Options, calls: [string, string, boolean][]) => {
    tl.reset();
    out.clear();
    stage.say(title);
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([throttlingCache({ throttle: 5000, ...options })]);
    for (const [path, lang, skipCache] of calls) {
      const res = await api
        .headers({ 'Accept-Language': lang })
        .options({ skipCache })
        .get(path)
        .res()
        .catch(() => null);
      if (stage.disposed || !res) return;
      const { text } = (await res.json()) as { text: string };
      const hit = cameFromCache(res);
      if (hit) tl.mark('cache hit', 'ok');
      const wrong = path === '/greeting' && ((lang === 'fi') !== (text === 'Hei maailma'));
      log(`${lang}: "${text}" ${hit ? '(cache)' : '(server)'}${wrong ? ' WRONG' : ''}`, wrong ? 'bad' : hit ? 'info' : 'ok');
      await stage.wait(350);
    }
    if (!stage.disposed) stage.say(`${server.requests.length} real request${server.requests.length === 1 ? '' : 's'} for two calls`, 'info');
  });

  const switched: [string, string, boolean][] = [['/greeting', 'en', false], ['/greeting', 'fi', false]];
  runCases(stage, [
    { label: 'Default key', run: () => go('Default key: method and address only, so Finnish gets the English answer', {}, switched) },
    { label: 'Key with language', run: () => go('Custom key adds the language, so each language has its own entry', { key: (url, opts) => `${opts.method}@${url}@${language(opts)}` }, switched) },
    { label: 'skipCache on one call', run: () => go('The second call says skipCache: true, so it is not served from memory', {}, [['/greeting', 'en', false], ['/greeting', 'en', true]]) },
    {
      label: 'skip a path',
      run: () =>
        go(
          'skip returns true for /live, so it is never cached',
          // A custom skip replaces the default one, so it repeats the default checks too.
          { skip: (url, opts) => opts.skipCache || opts.method !== 'GET' || url.includes('/live') },
          [['/live', 'en', false], ['/live', 'en', false]],
        ),
    },
  ], 1900);
  return () => stage.dispose();
};

export default mount;
