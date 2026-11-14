// .query() grows the address: an object, more objects, then a raw string
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each step adds to the address of the step before.' });
  const server = createServer(stage, { '/shop': () => ({ json: { ok: true } }) });
  wire(stage, server, { rows: 0 });
  const bar = address(stage.root);

  // The chain: each .query() returns a new client with a longer address.
  const base = wretch(`${BASE}/shop`).fetchPolyfill(server.fetch).addon(QueryStringAddon);
  const step1 = base.query({ a: 1, b: 2 });
  const step2 = step1.query({ c: 3, d: [4, 5] });
  const step3 = step2.query('five&six&seven=eight');

  const send = async (code: string, say: string, w: typeof base): Promise<void> => {
    stage.say(code);
    bar.set(`${BASE}/shop`);
    await w.get().res().catch(() => {});
    if (stage.disposed) return;
    bar.set(server.requests.at(-1)!.url);
    stage.say(say, 'ok');
  };

  runCases(stage, [
    { label: 'Step 1', run: () => send('.query({ a: 1, b: 2 })', 'An object became a=1&b=2', step1) },
    { label: 'Step 2', run: () => send('.query({ c: 3, d: [4, 5] })', 'A second object was added; the list d repeated its key', step2) },
    { label: 'Step 3', run: () => send(".query('five&six&seven=eight')", 'A string is added word for word', step3) },
  ]);
  return () => stage.dispose();
};

export default mount;
