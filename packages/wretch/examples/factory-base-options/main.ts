// wretch(address, options) sets both once for every request after it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { kv, optionRows } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three different requests, one shared set of options.' });
  const server = createServer(stage, { '*': () => ({ json: { ok: true } }) });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: [] });
  const options = kv(stage.root, 'Fetch options that came along');

  // The factory takes the base address and the options: every request below inherits both.
  const api = wretch(BASE, { cache: 'no-store', credentials: 'include' }).fetchPolyfill(server.fetch);

  const send = async (say: string, call: () => Promise<unknown>): Promise<void> => {
    stage.say(say);
    await call().catch(() => {});
    if (stage.disposed) return;
    const req = server.requests.at(-1)!;
    seen.show(req);
    options.set(optionRows(req));
    stage.say(`${req.method} ${req.path}: cache and credentials arrived without being repeated`, 'ok');
  };

  runCases(stage, [
    { label: 'Read posts', run: () => send('api.get("/posts").json()', () => api.get('/posts').json()) },
    { label: 'Add a post', run: () => send('api.post({ title }, "/posts").json()', () => api.post({ title: 'Hello' }, '/posts').json()) },
    { label: 'Delete a post', run: () => send('api.delete("/posts/2").res()', () => api.delete('/posts/2').res()) },
  ]);
  return () => stage.dispose();
};

export default mount;
