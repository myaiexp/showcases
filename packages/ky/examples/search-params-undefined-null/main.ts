// In searchParams, undefined removes a parameter and null is sent as 'null'
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

// A saved link already says ?filter=old. The user has just cleared the filter box.
const SAVED_LINK = 'https://shop.example/items?filter=old&sort=name';

const CASES = [
  { label: 'filter: undefined', params: { filter: undefined } },
  // TypeScript's type leaves null out on purpose (it is usually a mistake), so this needs `as never`.
  { label: 'filter: null', params: { filter: null as never } },
  { label: "filter: 'new'", params: { filter: 'new' } },
  { label: 'filter left out', params: {} },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'The link already holds filter=old. What should the filter box do to it?',
    routes: { '/items': (req) => ({ json: { filter: req.url.searchParams.getAll('filter') } }) },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: [] });
  const result = resultView(row, 'Server read filter as (all values)');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  cycle(stage, CASES, async (c) => {
    stage.say(`searchParams: { ${c.label} }`);
    const out = await attempt(stage, result, () => api.get(SAVED_LINK, { searchParams: c.params }).json<{ filter: string[] }>());
    if (!out.ok) return;
    const got = out.value.filter;
    if (got.length === 0) stage.say('undefined removed it, even from the link itself.', 'ok');
    else if (got.includes('null')) stage.say('null is not "nothing": the word "null" is sent too.', 'warn');
    else if (got.length === 2) stage.say('A new value is added next to the old one: both are sent.', 'warn');
    else stage.say('Not mentioned, so the link keeps its old filter.', 'info');
  }, { control: 'You pass', pause: 2200 });
  return stage.dispose;
};

export default mount;
