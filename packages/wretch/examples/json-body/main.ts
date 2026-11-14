// .json() makes JSON text and a label; .post(object) does the same
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { twin } from '../../shared/twin.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'An object goes in; JSON text and a content type come out.' });
  const server = createServer(stage, { 'POST /items': () => ({ status: 201, json: { saved: true } }) });
  wire(stage, server, { rows: 0 });
  const both = twin(stage, '.json(obj).post()', '.post(obj)', ['content-type']);

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const item = { a: 1, b: 2, c: 3 };

  const run = async (): Promise<void> => {
    both.show(null, null);
    stage.say('Sending { a: 1, b: 2, c: 3 } in two ways…');
    await api.url('/items').json(item).post().res().catch(() => {});
    if (stage.disposed) return;
    const first = server.requests.at(-1)!;
    // An object argument is treated as JSON, exactly as if .json() had been called.
    await api.post(item, '/items').res().catch(() => {});
    if (stage.disposed) return;
    both.show(first, server.requests.at(-1)!);
  };

  if (stage.bar) button(stage.bar, 'Send both', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(2400);
  });
  return () => stage.dispose();
};

export default mount;
