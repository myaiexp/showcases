// The readme's first example: ky.post with json against plain fetch
import type { Mount } from '@/types.ts';
import { cycle, demo } from '../../shared/req-kit.ts';
import { requestView } from '../../shared/panels.ts';

const PAYLOADS = [
  { label: '{ foo: true }', body: { foo: true } },
  { label: '{ order: 42, items: 3 }', body: { order: 42, items: 3 } },
  { label: '{ note: "Hi 🦄" }', body: { note: 'Hi 🦄' } },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'One server, two ways to send the same data. Compare what arrives.',
    routes: { 'POST /': { json: { data: '🦄' } } },
  });
  const row = stage.row();
  const plain = requestView(row, 'plain fetch sent', { headers: ['content-type', 'accept'] });
  const viaKy = requestView(row, 'ky sent', { headers: ['content-type', 'accept'] });
  let who = plain;
  server.on((e) => e.kind === 'arrive' && who.show(e.req));

  const url = 'https://example.com/';
  cycle(stage, PAYLOADS, async (p) => {
    stage.say('Sending the same data twice…');
    who = plain;
    // Plain fetch: you stringify, name the method, label the content, then check response.ok yourself.
    const response = await server.fetch(url, { method: 'POST', body: JSON.stringify(p.body), headers: { 'content-type': 'application/json' } });
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    await response.json();
    who = viaKy;
    // Ky: the same request in one call. It also checks the status for you.
    await api.post(url, { json: p.body }).json();
    const [a, b] = server.requests.slice(-2);
    const same = a?.body === b?.body && a?.method === b?.method && a?.headers.get('content-type') === b?.headers.get('content-type');
    stage.say(same ? 'Same method, body and label arrive. Ky only adds Accept.' : 'The two requests differ.', same ? 'ok' : 'bad');
  }, { control: 'Data', again: 'Send again', pause: 2000 });
  return stage.dispose;
};

export default mount;
