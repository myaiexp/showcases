// { recursive: true } flattens nested objects into names like a[b][c]
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { formPair } from '../../shared/formpair.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const DUCK = { duck: 'Muscovy', duckProperties: { beak: { color: 'yellow' }, legs: 2 } };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A form is flat, so a tree has to be flattened into field names.' });
  const server = createServer(stage, { 'POST /ducks': () => ({ status: 201, json: { ok: true } }) });
  const pair = formPair(stage, 'Your object (a tree)', 'Fields the server got');

  const api = wretch(`${BASE}/ducks`).fetchPolyfill(server.fetch).addon(FormDataAddon);

  const send = async (say: string, tone: 'ok' | 'bad', request: typeof api): Promise<void> => {
    pair.show(DUCK, null);
    await request.post().res().catch(() => {});
    if (stage.disposed) return;
    pair.show(DUCK, server.requests.at(-1)!);
    stage.say(say, tone);
  };

  runCases(stage, [
    {
      label: '{ recursive: true }',
      run: () => send('recursive: true walks into the tree: beak and legs became their own fields', 'ok', api.formData(DUCK, { recursive: true })),
    },
    {
      label: 'No option',
      run: () => send('Without the option the inner objects arrive as the useless text [object Object]', 'bad', api.formData(DUCK)),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
