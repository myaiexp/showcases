// searchParams adds to the query already in the address; it never replaces it
import type { KyInstance } from 'ky';
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const LIST = 'https://shop.example/products?category=shoes&page=1';

const CASES = [
  { label: 'add a new one: colour', call: (api: KyInstance) => api.get(LIST, { searchParams: { colour: 'red' } }) },
  { label: 'repeat one: page 2', call: (api: KyInstance) => api.get(LIST, { searchParams: { page: 2 } }) },
  { label: 'remove one: page undefined', call: (api: KyInstance) => api.get(LIST, { searchParams: { page: undefined } }) },
  { label: 'instance lang + this call', call: (api: KyInstance) => api.extend({ searchParams: { lang: 'fi' } }).get(LIST, { searchParams: { colour: 'red' } }) },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'The address already holds category=shoes&page=1. What does searchParams do to it?',
    routes: { '/products': (req) => ({ json: [...req.url.searchParams].map(([k, v]) => `${k} = ${v}`) }) },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: [] });
  const result = resultView(row, 'Server read the query as');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  cycle(stage, CASES, async (c) => {
    stage.say(c.label);
    const out = await attempt(stage, result, () => c.call(api).json<string[]>());
    if (!out.ok) return;
    const keys = out.value.map((l) => l.split(' = ')[0]);
    const twice = keys.find((k, i) => keys.indexOf(k) !== i);
    if (twice) stage.say(`${twice} was sent twice: the server may take either.`, 'warn');
    else if (!keys.includes('page')) stage.say('page is gone from the address.', 'ok');
    else stage.say('Your parameters were added to the address.', 'ok');
  }, { control: 'You add', pause: 2200 });
  return stage.dispose;
};

export default mount;
