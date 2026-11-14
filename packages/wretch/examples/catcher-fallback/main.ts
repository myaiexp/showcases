// .catcherFallback() takes every error that no other catcher claimed
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const CASES: readonly { label: string; code: string }[] = [
  { label: '404', code: '404' },
  { label: '500', code: '500' },
  { label: '418', code: '418' },
  { label: '503', code: '503' },
  { label: 'connection lost', code: 'lost' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two specific catchers and one fallback. Pick what goes wrong.' });
  const server = createServer(stage, {
    'GET /status/:code': (req) =>
      req.params['code'] === 'lost' ? { network: true } : { status: Number(req.params['code']), text: 'something went wrong' },
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.catcher(404)', '.catcher(500)', '.catcherFallback()']);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .catcher(404, () => {
      ran.fire('.catcher(404)', 'warn');
      shown.show('Not found', 'warn');
    })
    .catcher(500, () => {
      ran.fire('.catcher(500)', 'bad');
      shown.show('Server error', 'bad');
    })
    // Anything the two catchers above do not claim ends up here.
    .catcherFallback((err) => {
      const status = (err as { status?: number }).status;
      ran.fire('.catcherFallback()', 'info');
      shown.show(status ? `Unexpected problem (${status})` : 'The connection failed: no answer at all', 'info');
    });

  const send = async (code: string): Promise<void> => {
    ran.reset();
    shown.clear();
    stage.say(code === 'lost' ? 'The connection drops before any answer' : `The server answers ${code}`);
    await api.get(`/status/${code}`).json().catch(() => {});
    if (!stage.disposed) {
      stage.say(code === '404' || code === '500' ? `${code} has its own catcher` : `No catcher for ${code}: the fallback took it`, 'info');
    }
  };

  runCases(
    stage,
    CASES.map((c) => ({ label: c.label, run: () => send(c.code) })),
    1500,
  );
  return () => stage.dispose();
};

export default mount;
