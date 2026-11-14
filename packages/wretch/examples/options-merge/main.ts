// .options() mixes into earlier options; true replaces them
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { columns, headerRows, kv, optionRows } from '../../shared/screen.ts';
import { BASE, createServer, type ServerRequest } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both clients get the same two .options() calls. Only the second call of the right one has true.' });
  const server = createServer(stage, { '*': () => ({ json: { ok: true } }) });
  wire(stage, server, { rows: 0 });
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const mixed = kv(left, 'Mixed in (default)');
  const replaced = kv(right, 'Replaced (true)');

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const first = api.options({ headers: { Accept: 'application/json' } });
  // Default: the second call is mixed into the first, headers included.
  const merged = first.options({ cache: 'no-cache', headers: { 'X-Custom': 'hello' } });
  // With true: the second call is all that is left.
  const overridden = first.options({ cache: 'no-cache', headers: { 'X-Custom': 'hello' } }, true);

  const rowsOf = (req: ServerRequest): [string, string][] => [...headerRows(req), ...optionRows(req)];

  const sendBoth = async (): Promise<void> => {
    mixed.set([], 'waiting…');
    replaced.set([], 'waiting…');
    stage.say('Sending one request from each client…');
    await merged.get('/ping').json().catch(() => {});
    if (stage.disposed) return;
    mixed.set(rowsOf(server.requests.at(-1)!));
    await overridden.get('/ping').json().catch(() => {});
    if (stage.disposed) return;
    replaced.set(rowsOf(server.requests.at(-1)!));
    stage.say('Mixed keeps Accept and adds X-Custom; replaced lost Accept', 'ok');
  };

  if (stage.bar) button(stage.bar, 'Send both again', () => void sendBoth());
  runScript(stage, async (wait) => {
    await sendBoth();
    await wait(2200);
  });
  return () => stage.dispose();
};

export default mount;
