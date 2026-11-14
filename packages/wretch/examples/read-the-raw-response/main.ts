// .res() gives the browser's own Response before any body is read
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ask for the Response itself, not its contents.' });
  const server = createServer(stage, {
    'GET /posts/1': () => ({ json: { title: 'Morning light' }, headers: { etag: '"v7"' } }),
    'POST /posts': () => ({ status: 201, json: { id: 7 }, headers: { location: '/posts/7' } }),
    'DELETE /posts/1': () => ({ status: 204 }),
  });
  wire(stage, server, { rows: 0 });
  const facts = kv(stage.root, 'The Response');
  facts.set([], 'Nothing yet');
  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const show = (res: Response, say: string): void => {
    if (stage.disposed) return;
    facts.set([
      ['status', `${res.status} ${res.statusText}`],
      ['ok', String(res.ok)],
      ['url', res.url.replace(BASE, '')],
      ['type', res.type],
      ['content-type', res.headers.get('content-type') ?? 'none'],
      ['body read yet', String(res.bodyUsed)],
    ]);
    stage.say(say, 'ok');
  };

  runCases(stage, [
    { label: 'Get a post', run: () => api.get('/posts/1').res((r) => show(r, '.res() hands over the Response: you can look before you read the body')).catch(() => {}) },
    { label: 'Create a post', run: () => api.post({ title: 'New' }, '/posts').res((r) => show(r, '201 means created; the body has not been read yet')).catch(() => {}) },
    { label: 'Delete a post', run: () => api.delete('/posts/1').res((r) => show(r, '204: success with no body at all')).catch(() => {}) },
  ], 1800);
  return () => stage.dispose();
};

export default mount;
