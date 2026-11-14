// What an HTTPError carries: the answer, the request that caused it, and the options used
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import type { Reply } from '../../shared/server.ts';
import { cycle, demo, notes } from '../../shared/req-kit.ts';
import { pathOf } from '../../shared/wire.ts';

interface Case {
  label: string;
  method: 'get' | 'post';
  path: string;
  json?: unknown;
  reply: Reply;
}

const CASES: readonly Case[] = [
  {
    label: 'order clash (409)',
    method: 'post',
    path: '/orders',
    json: { item: 'teapot' },
    reply: { status: 409, json: { error: 'Already ordered' }, headers: { 'x-request-id': 'ord-4821' } },
  },
  { label: 'slow down (429)', method: 'get', path: '/search?q=tea', reply: { status: 429, headers: { 'retry-after': '30', 'x-request-id': 'req-77' } } },
  { label: 'no such user (404)', method: 'get', path: '/users/12', reply: { status: 404, json: { error: 'No such user' }, headers: { 'x-request-id': 'req-93' } } },
];

const mount: Mount = (el, ctx) => {
  let current = CASES[0]!;
  const { stage, api } = demo(el, ctx, {
    hint: 'The error is more than a message: it keeps the whole story of the failed request.',
    server: { latency: 80, delay: 60 },
    routes: { '*': () => current.reply },
  });
  const row = stage.row();
  const panels = stage.preview ? [notes(row, 'The HTTPError carries')] : [notes(row, 'error.response'), notes(row, 'error.request'), notes(row, 'error.options')];

  cycle(
    stage,
    CASES,
    async (c) => {
      current = c;
      panels.forEach((p) => p.pending());
      stage.say(`${c.method.toUpperCase()} ${c.path}: ${c.label}`);
      try {
        await api(`https://shop.example${c.path}`, { method: c.method, ...(c.json ? { json: c.json } : {}), retry: 0 });
      } catch (error) {
        if (stage.disposed) throw error;
        if (!isHTTPError(error)) throw error;
        const { response, request, options } = error;
        const ids = ['x-request-id', 'retry-after'].flatMap((h) => (response.headers.has(h) ? [`${h}: ${response.headers.get(h)}`] : []));
        const status = `${response.status} ${response.statusText}`;
        const sent = `${request.method} ${pathOf(new URL(request.url))}`;
        const limit = typeof options.retry === 'object' ? options.retry.limit : options.retry;
        if (stage.preview) {
          panels[0]!.set([`error.response → ${status}, ${ids[0] ?? ''}`, `error.request → ${sent}`, `error.options → ${options.method}, retry limit ${limit}`]);
        } else {
          panels[0]!.set([[`status: ${status}`, 'bad'], ...ids]);
          panels[1]!.set([sent, `content-type: ${request.headers.get('content-type') ?? '(none)'}`]);
          panels[2]!.set([`method: ${options.method}`, `retry limit: ${limit}`]);
        }
        stage.say(`${status}: the error still knows the request.`, 'ok');
      }
    },
    { control: 'The request', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
