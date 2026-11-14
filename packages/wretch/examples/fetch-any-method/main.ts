// .fetch(method, url, body) sends any method you name, even PURGE
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The method is just a word you pass in.' });
  const server = createServer(stage, {
    'PATCH /posts/:id': (req) => ({ json: { id: Number(req.params['id']), ...(req.body.kind === 'json' ? (req.body.value as object) : {}) } }),
    'DELETE /posts/:id': (req) => ({ json: { deleted: Number(req.params['id']) } }),
    'PURGE /cache': () => ({ json: { cleared: 'all cached pages' } }),
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const send = async (say: string, call: () => Promise<unknown>, describe: (data: any) => string): Promise<void> => {
    stage.say(say);
    const data = await call().catch(() => null);
    if (stage.disposed || !data) return;
    seen.show(server.requests.at(-1)!);
    shown.show(describe(data), 'ok');
  };

  runCases(stage, [
    {
      label: 'PATCH',
      run: () => send('.fetch("PATCH", "/posts/1", { title })', () => api.fetch('PATCH', '/posts/1', { title: 'A better title' }).json(), (d) => `Post ${d.id} is now "${d.title}"`),
    },
    {
      label: 'DELETE',
      run: () => send('.fetch("DELETE", "/posts/2")', () => api.fetch('DELETE', '/posts/2').json(), (d) => `Post ${d.deleted} was deleted`),
    },
    {
      // No shortcut exists for PURGE: .fetch() takes any method name.
      label: 'PURGE',
      run: () => send('.fetch("PURGE", "/cache")', () => api.fetch('PURGE', '/cache').json(), (d) => `Cleared ${d.cleared}`),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
