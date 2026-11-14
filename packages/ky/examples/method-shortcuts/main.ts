// ky.get, post, put, patch, delete, head and query: each one names the request
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

// Each shortcut is a verb: what the shop's page wants to do with order 7.
const CALLS = [
  { label: 'ky.get', method: 'get', goal: 'read the order' },
  { label: 'ky.post', method: 'post', goal: 'place a new order' },
  { label: 'ky.put', method: 'put', goal: 'replace the whole order' },
  { label: 'ky.patch', method: 'patch', goal: 'change one thing in it' },
  { label: 'ky.delete', method: 'delete', goal: 'cancel the order' },
  { label: 'ky.head', method: 'head', goal: 'ask if it exists, no details' },
  { label: 'ky.query', method: 'query', goal: 'search with a long question' },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Pick a shortcut: the server shows which method arrived.',
    routes: { '/orders/7': (req) => ({ json: { handled: req.method } }) },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: [] });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  cycle(
    stage,
    CALLS,
    async (c) => {
      stage.say(`${c.label}(…): ${c.goal}`);
      // The shortcut sets the method for you; the rest is a normal call.
      const call = api[c.method]('https://shop.example/orders/7', c.method === 'query' ? { json: { status: 'open' } } : {});
      // A HEAD answer has no body, so there is nothing to read: take the response itself.
      const out = await attempt(stage, result, () => (c.method === 'head' ? call.then((r) => ({ status: r.status })) : call.json()));
      if (out.ok) stage.say(`${c.label} arrives as ${c.method.toUpperCase()}: ${c.goal}.`, 'ok');
    },
    { control: 'Shortcut', again: 'Send again' },
  );
  return stage.dispose;
};

export default mount;
