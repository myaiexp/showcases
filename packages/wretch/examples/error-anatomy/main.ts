// A caught error carries status, address, the server text and the response
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer, type Reply } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const ANSWERS: Record<string, Reply> = {
  invoice: { status: 404, headers: { 'x-request-id': 'req-4821' }, text: 'Invoice 7 does not exist' },
  vault: { status: 403, headers: { 'x-request-id': 'req-9307' }, text: 'Only the owner may open the vault' },
  report: { status: 500, headers: { 'x-request-id': 'req-1150' }, text: 'Disk full while building the report' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each failure hands your handler an error object. Here is what is inside.' });
  const server = createServer(stage, { 'GET /:thing': (req) => ANSWERS[req.params['thing']!]! });
  wire(stage, server, { rows: 0 });
  const inside = kv(stage.root, 'Inside the error');
  inside.set([], 'No error yet');

  const open = async (thing: string): Promise<void> => {
    stage.say(`api.get("/${thing}") ... the server will say no`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/${thing}`)
      .notFound(show)
      .forbidden(show)
      .internalError(show)
      .json()
      .catch(() => {});
  };

  // One handler for all three: it only reads what the error carries.
  function show(err: Error & { status: number; url: string; response: Response }): void {
    inside.set([
      ['status', String(err.status)],
      ['url', err.url.replace(BASE, '')],
      ['message', err.message],
      ['response', `x-request-id: ${err.response.headers.get('x-request-id')}`],
    ]);
    stage.say('error.message is the text the server sent back, and error.response is the whole Response', 'warn');
  }

  runCases(stage, [
    { label: 'Missing invoice', run: () => open('invoice') },
    { label: 'Forbidden vault', run: () => open('vault') },
    { label: 'Broken report', run: () => open('report') },
  ]);
  return () => stage.dispose();
};

export default mount;
