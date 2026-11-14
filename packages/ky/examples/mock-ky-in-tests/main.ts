// Mock Ky in a test: a fetch that makes up the Response, nothing travels
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { resultView } from '../../shared/panels.ts';
import { attempt, cycle, notes } from '../../shared/req-kit.ts';
import { scene } from '../../shared/inst-kit.ts';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const PRETENDS = [
  { label: 'Pretend all is well', reply: () => new Response(JSON.stringify({ name: 'Test' }), { headers: JSON_HEADERS }) },
  { label: 'Pretend the server broke', reply: () => new Response(JSON.stringify({ error: 'boom' }), { status: 500, headers: JSON_HEADERS }) },
  {
    label: 'Pretend the network is down',
    reply: (): Response => {
      throw new TypeError('Failed to fetch');
    },
  },
];

const mount: Mount = (el, ctx) => {
  let pretend = PRETENDS[0]!;
  let calls = 0;
  // The pretend server only sits there so you can see that it never hears anything.
  const { stage, server } = scene(el, ctx, {
    hint: 'This is how a test can run code that uses Ky without any server: Ky is given a fetch that makes up the answer.',
    wire: { client: 'your test', host: 'real server' },
  });
  const row = stage.row();
  const traffic = notes(row, 'Traffic');
  const out = resultView(row, 'Your code got');
  const showTraffic = (): void =>
    traffic.set([[`requests on the wire: ${server.requests.length}`, 'ok'], `calls to your fake: ${calls}`]);
  showTraffic();

  // The readme's recipe: ky.create({fetch}) with a function that returns a Response by hand.
  const api = ky.create({
    retry: 0,
    fetch: async () => {
      calls++;
      return pretend.reply();
    },
  });

  cycle(stage, PRETENDS, async (item) => {
    pretend = item;
    stage.say(`${item.label}: running the code under test…`);
    const got = await attempt(stage, out, () => api.get('https://api.example/user').json());
    showTraffic();
    stage.say(got.ok ? 'The code got its data, and nothing travelled.' : 'Even the failure is made up: still nothing on the wire.', got.ok ? 'ok' : 'warn');
  });
  return stage.dispose;
};

export default mount;
