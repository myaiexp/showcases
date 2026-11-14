// A 401 catcher replays the call, but the replay decides what the caller gets back
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both clients start with an old password. Each asks for a note as text.' });
  const server = createServer(stage, {
    'GET /note': (req) => {
      const login = atob((req.headers.get('authorization') ?? '').replace('Basic ', '') || 'Og==');
      return login === 'user:new-token-1' ? { json: { text: 'Buy bread' } } : { status: 401, json: { error: 'expired' } };
    },
  });
  wire(stage, server, { rows: 0 });
  const [a, b] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const one = screen(a, 'One replay for all calls', '…');
  const own = screen(b, 'A replay per call', '…');

  const refreshAuthToken = async (): Promise<string> => 'new-token-1';

  // The catcher's own result replaces whatever the caller asked for. So the replay must end the way the caller does.
  const replayAs = (how: 'json' | 'text') => async (_error: unknown, request: ReturnType<typeof base>) => {
    const request2 = request.basicAuth('user', await refreshAuthToken());
    const again = request2.fetch().unauthorized((err) => {
      throw err;
    });
    return how === 'json' ? again.json() : again.text();
  };
  const base = () => wretch(BASE).fetchPolyfill(server.fetch).addon(BasicAuthAddon).basicAuth('user', 'old-token');

  const describe = (value: unknown): string => (typeof value === 'string' ? `a string: ${value}` : `an object, not text: ${JSON.stringify(value)}`);

  const run = async (): Promise<void> => {
    one.clear('…');
    own.clear('…');
    stage.say('Each client opens GET /note with .text(): the old password gets a 401 first');
    // One catcher that always replays as JSON.
    const shared = await base()
      .catcher(401, replayAs('json'))
      .get('/note')
      .text()
      .catch(() => null);
    if (stage.disposed) return;
    one.show(describe(shared), typeof shared === 'string' ? 'ok' : 'bad');
    const mine = await base()
      .get('/note')
      .unauthorized(replayAs('text'))
      .text()
      .catch(() => null);
    if (stage.disposed) return;
    own.show(describe(mine), typeof mine === 'string' ? 'ok' : 'bad');
    stage.say('The caller asked for text. Only the replay that also ended in .text() gave it text back', typeof mine === 'string' ? 'ok' : 'warn');
  };

  runCases(stage, [{ label: 'Open the note', run: run }], 2600);
  return () => stage.dispose();
};

export default mount;
