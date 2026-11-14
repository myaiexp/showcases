// Every call returns a new client, so branches never change the base
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { columns, kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const GREETING: Record<string, string> = { en: 'Hello', fi: 'Hei' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One base client and two branches. The base never picks up their headers.' });
  const server = createServer(stage, {
    'GET /hello': (req) => ({ text: GREETING[req.headers.get('accept-language') ?? ''] ?? '(none)' }),
  });
  wire(stage, server, { rows: 0 });
  const cols = columns(stage.root, 3);
  const panes = ['base', 'english', 'finnish'].map((name, i) => kv(cols[i]!, name));

  const base = wretch(BASE).headers({ 'X-App': 'showcase' }).fetchPolyfill(server.fetch);
  // Each branch is a copy of base plus one more header. base itself is untouched.
  const english = base.headers({ 'Accept-Language': 'en' });
  const finnish = base.headers({ 'Accept-Language': 'fi' });

  const send = async (client: typeof base, pane: number): Promise<void> => {
    const answer = await client.get('/hello').text().catch(() => '?');
    if (stage.disposed) return;
    const req = server.requests.at(-1)!;
    const lang: [string, string] = ['lang', req.headers.get('accept-language') ?? '—'];
    // A card is too narrow for three rows in three columns: it keeps the language and the reply.
    panes[pane]!.set(stage.preview ? [lang, ['says', answer]] : [['x-app', req.headers.get('x-app') ?? '—'], lang, ['reply', answer]]);
  };
  const sendAll = async (): Promise<void> => {
    panes.forEach((p) => p.set([], '…'));
    stage.say('Same base, three clients: base, english, finnish');
    await send(base, 0);
    await send(english, 1);
    await send(finnish, 2);
    if (stage.disposed) return;
    stage.say('The base sent no language: the branches did not change it', 'ok');
  };

  if (stage.bar) button(stage.bar, 'Send from all three', () => void sendAll());
  runScript(stage, async (wait) => {
    await sendAll();
    await wait(2200);
  });
  return () => stage.dispose();
};

export default mount;
