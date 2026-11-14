// FormData body: Ky sends it as multipart; the server reads each field out
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { loop } from '../../shared/err-kit.ts';
import { resultView } from '../../shared/panels.ts';
import { attempt, demo } from '../../shared/req-kit.ts';
import { rawBodyView } from '../../shared/tip-kit.ts';

// The card places a different order each round.
const ORDERS: [string, string][] = [
  ['fries', 'icetea'],
  ['burger', 'cola'],
];

const mount: Mount = (el, ctx) => {
  let food = 'fries';
  let drink = 'icetea';
  let round = 0;
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Change the order and send it. The grey lines are the envelope Ky and the browser wrap around your fields.',
    server: { latency: 100, delay: 80 },
    routes: {
      'POST /order': (req) => ({ json: { thanks: true, fields: (req.body.match(/name="/g) ?? []).length } }),
    },
  });
  const row = stage.row();
  const seen = rawBodyView(row);
  const out = stage.preview ? null : resultView(row);
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));
  if (!stage.preview) {
    textInput(stage.bar!, 'food', food, (v) => (food = v));
    textInput(stage.bar!, 'drink', drink, (v) => (drink = v));
  }

  loop(
    stage,
    async () => {
      if (stage.preview) [food, drink] = ORDERS[round++ % ORDERS.length]!;
      server.reset();
      seen.show(null);
      stage.say(`Sending an order: ${food} and ${drink}…`);
      // A FormData body: no json, no content-type. Ky leaves both to the browser.
      const form = new FormData();
      form.append('food', food);
      form.append('drink', drink);
      const got = await attempt(
        stage,
        out ?? { pending() {}, value() {}, error() {} },
        () => api.post('https://diner.example/order', { body: form, retry: 0 }).json(),
      );
      stage.say(got.ok ? 'Two fields travelled as separate labelled parts.' : 'The order failed.', got.ok ? 'ok' : 'bad');
    },
    { label: 'Send order', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
