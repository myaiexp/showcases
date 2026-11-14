// A middleware that merges headers set under different spellings into one
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { contentTypeView, strictJsonRoute } from '../../shared/ctype.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same doubled header, sent without and then with the clean-up middleware.' });
  const server = createServer(stage, { 'POST /posts': strictJsonRoute });
  wire(stage, server, { rows: 0 });
  const sent = contentTypeView(stage, server);
  const shown = screen(stage.root, 'What the app shows');

  // The README's dedupeHeaders() reads `headers.raw()`, a method only Node's own fetch has: browsers throw.
  // This version does the same job a different way. wretch keeps headers in a plain object, so a
  // doubled header is still two keys there, before any Headers object glues them together.
  const dedupeHeaders: ConfiguredMiddleware = (next) => (url, opts) => {
    const groups = new Map<string, string[]>();
    const given = opts.headers instanceof Headers ? [...opts.headers.entries()] : Object.entries(opts.headers ?? {});
    for (const [name, value] of given) {
      const key = name.toLowerCase();
      groups.set(key, [...(groups.get(key) ?? []), String(value)]);
    }
    const headers = new Headers();
    // A Set drops repeats, so the same value under two spellings is sent once.
    for (const [key, values] of groups) for (const value of new Set(values)) headers.append(key, value);
    return next(url, { ...opts, headers });
  };

  const plain = wretch(BASE).fetchPolyfill(server.fetch);
  const fixed = plain.middlewares([dedupeHeaders]);

  const post = async (api: typeof plain, say: string): Promise<void> => {
    sent.set([], 'Sending…');
    shown.clear('Saving…');
    stage.say(say);
    const ok = await api
      .headers({ 'content-type': 'application/json' })
      .json({ foo: 'bar' })
      .post(undefined, '/posts')
      .res()
      .then(() => true)
      .catch(() => false);
    if (stage.disposed) return;
    shown.show(ok ? 'Saved' : 'The server refused the post', ok ? 'ok' : 'bad');
    stage.say(ok ? 'The middleware merged the two spellings into one header, so the server accepted the post' : 'Two spellings went out and were glued together', ok ? 'ok' : 'bad');
  };

  runCases(stage, [
    { label: 'Without the middleware', run: () => post(plain, 'Two spellings of Content-Type, no clean-up') },
    { label: 'With dedupeHeaders', run: () => post(fixed, 'The same request through the clean-up middleware') },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
