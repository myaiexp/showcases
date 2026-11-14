// .resolve(fn, true) forgets earlier resolvers, even a 404 handler
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two clients ask for a post that does not exist.' });
  const server = createServer(stage, { 'GET /posts/:id': () => ({ status: 404, json: { error: 'No such post' } }) });
  wire(stage, server, { rows: 0 });
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const kept = screen(left, '.resolve() twice', 'waiting');
  const cleared = screen(right, '.resolve(…, true)', 'waiting');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    // First resolver: every request gets a friendly 404 message.
    .resolve((r) => r.notFound(() => 'Friendly message: no such post'));

  // Second resolver, added after the first: both run, so the 404 is still handled.
  const keeping = api.resolve((r) => r.json());
  // With true, the notFound resolver is dropped and only this one runs.
  const clearing = api.resolve((r) => r.json(), true);

  const run = async (): Promise<void> => {
    kept.clear('waiting');
    cleared.clear('waiting');
    stage.say('GET /posts/99 from both clients');
    const a: unknown = await keeping.get('/posts/99').catch((e: { status?: number }) => `Rejected: HTTP ${e.status}`);
    if (stage.disposed) return;
    kept.show(String(a), 'ok');
    const b: unknown = await clearing.get('/posts/99').catch((e: { status?: number }) => `Rejected: HTTP ${e.status}`);
    if (stage.disposed) return;
    cleared.show(String(b), 'bad');
    stage.say('true cleared the 404 handler too, so the error reached the caller', 'warn');
  };

  if (stage.bar) button(stage.bar, 'Ask again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(2200);
  });
  return () => stage.dispose();
};

export default mount;
