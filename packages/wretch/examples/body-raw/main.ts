// .body() sets the raw body; passing text to .put() is the same request
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { twin } from '../../shared/twin.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two ways to write it. Compare what the server received.' });
  const server = createServer(stage, { 'PUT /note': () => ({ json: { saved: true } }) });
  wire(stage, server, { rows: 0 });
  const both = twin(stage, '.body("hello").put()', '.put("hello")');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const run = async (): Promise<void> => {
    both.show(null, null);
    stage.say('Sending the same text in two ways…');
    await api.url('/note').body('hello').put().json().catch(() => {});
    if (stage.disposed) return;
    const first = server.requests.at(-1)!;
    // A text argument goes straight into the body, no .body() needed.
    await api.put('hello', '/note').json().catch(() => {});
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
