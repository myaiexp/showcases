// recursive can be a list of key names to keep as they are instead of flattening
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { formPair } from '../../shared/formpair.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const DUCK = { duck: 'Muscovy', duckProperties: { beak: { color: 'yellow' }, legs: 2 }, ignored: { key: 0 } };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The list names keys that are not walked into. Read what arrives for them.' });
  const server = createServer(stage, { 'POST /ducks': () => ({ status: 201, json: { ok: true } }) });
  const pair = formPair(stage, 'Your object', 'Fields the server got');

  const api = wretch(`${BASE}/ducks`).fetchPolyfill(server.fetch).addon(FormDataAddon);

  const send = async (say: string, tone: 'ok' | 'warn', request: typeof api): Promise<void> => {
    pair.show(DUCK, null);
    await request.post().res().catch(() => {});
    if (stage.disposed) return;
    pair.show(DUCK, server.requests.at(-1)!);
    stage.say(say, tone);
  };

  // Note: the README says "ignored" is left out. In 3.0.9 it is still sent, as [object Object].
  runCases(stage, [
    { label: 'recursive: true', run: () => send('Every inner object is flattened, even "ignored"', 'ok', api.formData(DUCK, { recursive: true })) },
    {
      label: "recursive: ['ignored']",
      run: () => send('"ignored" is not flattened, but it is not dropped: it arrives as [object Object]', 'warn', api.formData(DUCK, { recursive: ['ignored'] })),
    },
    {
      label: "recursive: ['beak']",
      run: () => send('The list matches key names at any depth: "beak" arrives as [object Object] too', 'warn', api.formData(DUCK, { recursive: ['beak'] })),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
