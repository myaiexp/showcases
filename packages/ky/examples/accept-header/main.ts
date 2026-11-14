// The Accept header Ky adds depends on the body shortcut you chain on the call
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const FORM = '--b\r\nContent-Disposition: form-data; name="city"\r\n\r\nOulu\r\n--b--\r\n';

// The server really does choose its answer from the Accept header, as many do.
const answer = (accept: string) => {
  if (accept.includes('multipart')) return { text: FORM, headers: { 'content-type': 'multipart/form-data; boundary=b' } };
  if (accept.includes('text/csv')) return { text: 'city,tempC\nOulu,-3', headers: { 'content-type': 'text/csv' } };
  if (accept.startsWith('text/')) return { text: 'Oulu: -3 °C' };
  return { json: { city: 'Oulu', tempC: -3 } };
};

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Same address every time; only the way you read the answer changes.',
    routes: { '/weather': (req) => answer(req.headers.get('accept') ?? '') },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: ['accept'], mark: ['accept'] });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  const url = 'https://weather.example/weather';
  const CASES = [
    { label: '.json()', call: () => api.get(url).json() },
    { label: '.text()', call: () => api.get(url).text() },
    { label: '.formData()', call: () => api.get(url).formData().then((f) => Object.fromEntries(f)) },
    // No shortcut: Ky has nothing to guess from, so it adds no Accept header at all.
    { label: 'no shortcut', call: () => api.get(url).then((r) => r.text()) },
    // Your own Accept header always wins over the one the shortcut would add.
    { label: "your own accept: 'text/csv'", call: () => api.get(url, { headers: { accept: 'text/csv' } }).text() },
  ];
  cycle(stage, CASES, async (c) => {
    stage.say(`api.get(url)${c.label.startsWith('.') ? c.label : ''}`);
    const out = await attempt(stage, result, c.call);
    const accept = server.requests.at(-1)?.headers.get('accept');
    if (out.ok) stage.say(accept ? `Ky asked for "${accept}", so the server answered in kind.` : 'No shortcut, no Accept: the server picked its default.', 'ok');
  }, { control: 'You call', pause: 2000 });
  return stage.dispose;
};

export default mount;
