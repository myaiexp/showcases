// Options Ky does not know go to fetch() as its second argument, untouched
import ky, { type Options } from 'ky';
import type { Mount } from '@/types.ts';
import { cycle, notes } from '../../shared/req-kit.ts';
import { scene } from '../../shared/inst-kit.ts';

// `next` and `priority` are not Ky options, so TypeScript may need a nudge (the readme says so).
const CASES = [
  { label: "cache: 'no-store'", options: { cache: 'no-store' } as Options },
  { label: 'next: {revalidate: 60}', options: { next: { revalidate: 60 } } as Options },
  { label: "priority: 'high'", options: { priority: 'high' } as Options },
  { label: 'timeout: 5000 (a Ky option)', options: { timeout: 5000 } as Options },
];

const mount: Mount = (el, ctx) => {
  const { stage, server } = scene(el, ctx, {
    hint: 'Ky knows its own options and the standard request ones. Anything else is handed to fetch as it is.',
    routes: { '/page': { json: { ok: true } } },
  });
  const row = stage.row();
  const inside = notes(row, 'Inside the request');
  const extra = notes(row, 'Extra for fetch()');

  // A fetch of your own sees both things Ky hands over: the request and the extra init object.
  const api = ky.create({
    retry: 0,
    fetch: async (request, init) => {
      const r = request as Request;
      inside.set([`${r.method} ${new URL(r.url).pathname}`, [`cache: ${r.cache}`, r.cache === 'default' ? 'info' : 'ok']]);
      const keys = Object.keys(init ?? {});
      extra.set(keys.length ? keys.map((k): [string, 'ok'] => [`${k}: ${JSON.stringify((init as Record<string, unknown>)[k])}`, 'ok']) : [['nothing extra', 'info']]);
      return server.fetch(request, init);
    },
  });

  cycle(stage, CASES, async (item) => {
    inside.pending();
    extra.pending();
    stage.say(`Calling with ${item.label}…`);
    await api.get('https://shop.example/page', item.options).json();
    stage.say(
      item.label.startsWith('cache') ? 'A standard option: it lives in the request itself.' : item.label.startsWith('timeout') ? 'Ky keeps its own options: fetch never sees them.' : 'Not a Ky option: forwarded to fetch as an extra.',
      'ok',
    );
  });
  return stage.dispose;
};

export default mount;
