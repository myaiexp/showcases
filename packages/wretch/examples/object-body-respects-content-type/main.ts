// An object body becomes JSON unless a non-JSON content type came first
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same object sent four times, each with a different content type set first.' });
  const server = createServer(stage, { 'POST /echo': () => ({ json: { received: true } }) });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['content-type'] });
  const shown = screen(stage.root, 'What it meant');

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const pet = { name: 'Miso', age: 3 };

  const send = async (say: string, request: typeof api, body: unknown): Promise<void> => {
    stage.say(say);
    shown.clear();
    await request.post(body, '/echo').res().catch(() => {});
    if (stage.disposed) return;
    const req = server.requests.at(-1)!;
    seen.show(req);
    if (req.body.kind === 'json') {
      shown.show(`Real JSON, labelled ${req.headers.get('content-type')}`, 'ok');
    } else if (req.body.kind === 'text' && req.body.text === '[object Object]') {
      // wretch only turns objects into JSON when the content type is JSON-like (or unset).
      // Here it handed the object to fetch untouched, and fetch wrote it as "[object Object]".
      shown.show('Text "[object Object]": the object was not converted, so the server got nothing useful', 'bad');
    } else {
      shown.show(`Text, labelled ${req.headers.get('content-type')}`, 'info');
    }
  };

  runCases(
    stage,
    [
      { label: 'No type set', run: () => send('.post(pet): no content type, so JSON', api, pet) },
      { label: 'JSON-like type set', run: () => send('.content("application/vnd.api+json").post(pet): still JSON, keeps your label', api.content('application/vnd.api+json'), pet) },
      { label: 'text/plain set', run: () => send('.content("text/plain").post(pet): not JSON, so the object is not converted', api.content('text/plain'), pet) },
      { label: 'text/plain, string body', run: () => send('.content("text/plain").post(JSON.stringify(pet)): convert it yourself', api.content('text/plain'), JSON.stringify(pet)) },
    ],
    2600,
  );
  return () => stage.dispose();
};

export default mount;
