// method: 'patch' in lower case: fetch sends it as is, Ky fixes it
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const SPELLINGS = [
  { label: "'patch'", method: 'patch' },
  { label: "'Patch'", method: 'Patch' },
  { label: "'delete'", method: 'delete' },
  { label: "'query'", method: 'query' },
  { label: "'purge' (not a standard method)", method: 'purge' },
] as const;

// This server is strict, like many real ones: only the capitalised spelling is understood.
const KNOWN = ['GET', 'PATCH', 'DELETE', 'QUERY', 'PURGE'];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Same spelling, two senders: the browser\'s fetch and Ky.',
    routes: { '/profile': (req) => (KNOWN.includes(req.method) ? { json: { saved: true } } : { status: 405, json: { error: 'Method Not Allowed' } }) },
  });
  const row = stage.row();
  const plain = requestView(row, 'plain fetch sent', { headers: [] });
  const viaKy = requestView(row, 'ky sent', { headers: [] });
  const resultRow = stage.row();
  const left = resultView(resultRow, 'fetch got');
  const right = resultView(resultRow, 'ky got');
  let who = plain;
  server.on((e) => e.kind === 'arrive' && who.show(e.req));

  const url = 'https://app.example/profile';
  cycle(
    stage,
    SPELLINGS,
    async (s) => {
      stage.say(`method: ${s.label} on both sides`);
      who = plain;
      // The browser's own fetch: the spelling goes out untouched, unless it is one of GET, POST, PUT, DELETE, HEAD, OPTIONS.
      await attempt(stage, left, async () => (await server.fetch(url, { method: s.method, body: '{}' })).status, (status) => `status ${status}`);
      who = viaKy;
      // Ky: the standard methods (GET, POST, PUT, PATCH, HEAD, DELETE, QUERY) are uppercased first.
      await attempt(stage, right, () => api(url, { method: s.method, retry: 0 }).then((r) => r.status), (status) => `status ${status}`);
      const a = server.requests.at(-2)?.method;
      const b = server.requests.at(-1)?.method;
      stage.say(a === b ? `Both send ${b}: Ky has nothing to fix.` : `fetch sent ${a}, Ky sent ${b}.`, a === b ? 'info' : 'warn');
    },
    { control: 'You write method', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
