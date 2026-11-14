// ky.query: a search with a body that Ky may safely repeat
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const FILTER = { colours: ['red', 'blue'], sizes: [38, 39, 40], maxPrice: 80, inStock: true };

const CASES = [
  { label: 'ky.query (safe to repeat)', method: 'query' },
  { label: 'ky.post (might change something)', method: 'post' },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'The first answer is a server hiccup (503). See who tries again.',
    // The server stumbles on the first try of every run, then answers.
    routes: { '/shoes/search': (req) => (req.n === 1 ? { status: 503, json: { error: 'busy' } } : { json: { found: 12 } }) },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received (last)', { headers: ['content-type'] });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  cycle(stage, CASES, async (c) => {
    server.reset();
    stage.say(`${c.label}: filter too long for the address`);
    // The filter travels in the body, like a POST, but QUERY promises it only reads.
    const out = await attempt(stage, result, () => api[c.method]('https://shop.example/shoes/search', { json: FILTER }).json());
    const tries = server.requests.length;
    if (out.ok) stage.say(`Ky tried again by itself: ${tries} tries, answer came.`, 'ok');
    else stage.say('Only 1 try: a POST is not repeated, in case it changes something twice.', 'warn');
  }, { control: 'Send with', pause: 2400 });
  return stage.dispose;
};

export default mount;
