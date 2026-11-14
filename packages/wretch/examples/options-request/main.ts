// .opts() asks which methods an address allows (the Allow header)
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const PLACES: Record<string, string> = {
  '/posts': 'GET, POST, HEAD, OPTIONS',
  '/posts/1': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
  '/status': 'GET, HEAD, OPTIONS',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each address allows a different set of methods.' });
  const server = createServer(stage, {
    'OPTIONS *': (req) => ({ status: 204, headers: { allow: PLACES[req.path] ?? 'OPTIONS' } }),
  });
  wire(stage, server, { rows: 0 });
  const allowed = chips(stage.root, METHODS, 'Methods the server allows here');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const ask = async (path: string): Promise<void> => {
    allowed.reset();
    stage.say(`.opts("${path}").res()`);
    const list = await api
      .opts(path)
      .res((r) => r.headers.get('allow') ?? '')
      .catch(() => null);
    if (stage.disposed || list === null) return;
    const names = list.split(',').map((s) => s.trim());
    for (const m of names) allowed.fire(m, 'ok', `Allow: ${list}`, true);
    stage.say(`${path} allows ${names.length} methods`, 'ok');
  };

  runCases(
    stage,
    Object.keys(PLACES).map((path) => ({ label: path, run: () => ask(path) })),
    1700,
  );
  return () => stage.dispose();
};

export default mount;
