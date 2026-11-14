// URLSearchParams body: the old-style form, one line of name=value pairs
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { loop } from '../../shared/err-kit.ts';
import { requestView } from '../../shared/panels.ts';
import { demo, notes } from '../../shared/req-kit.ts';

// Spaces and symbols are the interesting part: the card tries both.
const ORDERS: [string, string][] = [
  ['fries', 'ice tea'],
  ['fish & chips', 'tea, no sugar'],
];

const mount: Mount = (el, ctx) => {
  let food = 'fries';
  let drink = 'ice tea';
  let round = 0;
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Type spaces, & or = into a field. Ky sends the pairs on one line, with symbols spelled out so they cannot be mistaken for separators.',
    server: { latency: 100, delay: 80 },
    routes: {
      // The server undoes the encoding to get the fields back.
      'POST /order': (req) => ({ json: Object.fromEntries(new URLSearchParams(req.body)) }),
    },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: ['content-type'], mark: ['content-type'] });
  const read = notes(row, 'Server read it as');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  loop(
    stage,
    async () => {
      if (stage.preview) [food, drink] = ORDERS[round++ % ORDERS.length]!;
      server.reset();
      seen.show(null);
      read.pending();
      stage.say(`Sending: ${food} and ${drink}…`);
      // URLSearchParams as the body: Ky adds the content-type, the browser does the encoding.
      const fields = new URLSearchParams();
      fields.set('food', food);
      fields.set('drink', drink);
      const got = await api.post('https://diner.example/order', { body: fields, retry: 0 }).json<Record<string, string>>();
      read.set(Object.entries(got).map(([k, v]) => `${k} = ${v}`));
      stage.say('Symbols were spelled out, then restored.', 'ok');
    },
    { label: 'Send order', pause: 2200 },
  );
  if (!stage.preview) {
    textInput(stage.bar!, 'food', food, (v) => (food = v));
    textInput(stage.bar!, 'drink', drink, (v) => (drink = v));
  }
  return stage.dispose;
};

export default mount;
