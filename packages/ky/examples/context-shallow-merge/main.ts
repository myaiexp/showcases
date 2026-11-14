// Client context and call context merge one level deep only
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { cycle, notes } from '../../shared/req-kit.ts';
import { compact, scene } from '../../shared/inst-kit.ts';
import type { Tone } from '../../shared/panels.ts';

const INSTANCE = { app: 'shop', limits: { max: 5, burst: 2 } };

const CALLS: { label: string; context: Record<string, unknown> }[] = [
  { label: 'Add a new key', context: { user: 'aino' } },
  { label: 'Replace a top-level key', context: { app: 'admin' } },
  { label: 'Change one nested value', context: { limits: { max: 10 } } },
];

const mount: Mount = (el, ctx) => {
  const { stage, server } = scene(el, ctx, {
    hint: 'The client has some context. A call adds its own. Pick what the call brings and see what the hook gets.',
    routes: { '/ping': { json: { ok: true } } },
  });
  const row = stage.row();
  const given = notes(row, 'You gave');
  const saw = notes(row, 'The hook saw');
  let seen: Record<string, unknown> = {};

  const api = ky.create({
    fetch: server.fetch,
    context: INSTANCE,
    hooks: { beforeRequest: [({ options }) => void (seen = { ...options.context })] },
  });

  cycle(stage, CALLS, async (item) => {
    given.set([`client: ${compact(INSTANCE)}`, `call: ${compact(item.context)}`]);
    saw.pending();
    stage.say(`${item.label}…`);
    // The Ky call: context given to this one call, merged over the client's.
    await api.get('https://shop.example/ping', { context: item.context });
    const lines: (string | readonly [string, Tone])[] = Object.entries(seen).map(([key, value]): string | readonly [string, Tone] => {
      const replaced = key in item.context && key in INSTANCE;
      return replaced ? [`${key}: ${compact(value)} (replaced)`, 'warn'] : `${key}: ${compact(value)}`;
    });
    // Anything inside a replaced object that the client had set is simply gone.
    const old = INSTANCE.limits;
    const now = seen['limits'] as Record<string, unknown>;
    const lost = Object.keys(old).filter((k) => !(k in now));
    if (lost.length) lines.push([`limits.${lost.join(', ')} is gone`, 'bad']);
    saw.set(lines);
    stage.say(lost.length ? 'Only the top level is merged: the nested limits was replaced whole.' : 'Keys that do not clash are simply combined.', lost.length ? 'warn' : 'ok');
  });
  return stage.dispose;
};

export default mount;
