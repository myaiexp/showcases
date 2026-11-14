// Bad options reject the promise before anything is sent
import type { KyInstance } from 'ky';
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo, notes } from '../../shared/req-kit.ts';
import { resultView } from '../../shared/panels.ts';

const url = 'https://api.example/ping';

const CASES = [
  { label: 'retry: -1', call: (api: KyInstance) => api.get(url, { retry: -1 }).json() },
  { label: 'timeout: -5', call: (api: KyInstance) => api.get(url, { timeout: -5 }).json() },
  { label: 'timeout: 3000000000', call: (api: KyInstance) => api.get(url, { timeout: 3_000_000_000 }).json() },
  { label: "retry: 'twice'", call: (api: KyInstance) => api.get(url, { retry: 'twice' as never }).json() },
  { label: 'timeout: 5000 (fine)', call: (api: KyInstance) => api.get(url, { timeout: 5000 }).json() },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Each call has one bad option. Watch the wire: the request never leaves.',
    routes: { '/ping': { json: { pong: true } } },
  });
  const row = stage.row();
  const sent = notes(row, 'Server received');
  const result = resultView(row, 'Your code got');

  cycle(stage, CASES, async (c) => {
    server.reset();
    sent.pending('waiting…');
    stage.say(`api.get(url, { ${c.label} })`);
    // Ky checks every option first. A bad one rejects the promise, like fetch would.
    const out = await attempt(stage, result, () => c.call(api));
    const n = server.requests.length;
    sent.set(n ? [`${n} request arrived`] : [['0 requests: nothing was sent', 'ok']]);
    stage.say(out.ok ? 'A good option: the request goes out as usual.' : 'Rejected up front: nothing travelled.', out.ok ? 'ok' : 'warn');
  }, { control: 'Option', pause: 2200 });
  return stage.dispose;
};

export default mount;
