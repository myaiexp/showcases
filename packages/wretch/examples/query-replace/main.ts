// .query() adds to the existing query; { replace: true } throws it away first
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const START = `${BASE}/search?page=2&sort=name`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The client starts out on a search page with two parameters.' });
  const server = createServer(stage, { '/search': () => ({ json: { ok: true } }) });
  wire(stage, server, { rows: 0 });
  const bar = address(stage.root);

  const api = wretch(START).fetchPolyfill(server.fetch).addon(QueryStringAddon);

  const send = async (code: string, say: string, w: typeof api): Promise<void> => {
    stage.say(code);
    bar.set(START);
    await w.get().res().catch(() => {});
    if (stage.disposed) return;
    bar.set(server.requests.at(-1)!.url);
    stage.say(say, 'ok');
  };

  runCases(stage, [
    { label: 'Add', run: () => send(".query({ filter: 'new' })", 'Added: page and sort are still there', api.query({ filter: 'new' })) },
    {
      label: 'Replace',
      run: () => send('.query({ reset: true }, { replace: true })', 'Replaced: page and sort are gone, only reset is left', api.query({ reset: true }, { replace: true })),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
