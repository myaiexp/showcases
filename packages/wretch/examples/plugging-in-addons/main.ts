// A plain client lacks .formData() and .query(); .addon() plugs them in
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const has = (w: object, name: string): string => (typeof (w as Record<string, unknown>)[name] === 'function' ? 'available' : 'missing');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'First a client with no addons, then the same client with two plugged in.' });
  const server = createServer(stage, { 'POST /signup': () => ({ status: 201, json: { ok: true } }) });
  if (!stage.preview) wire(stage, server, { rows: 3 });
  const methods = kv(stage.root, 'Methods on the client');
  const seen = envelope(stage, { headers: [] });

  const plain = wretch(`${BASE}/signup`).fetchPolyfill(server.fetch);
  // The addons: two extra features plugged into the same client.
  const api = plain.addon([FormDataAddon, QueryStringAddon]);

  const showMethods = (w: object): void => methods.set([['.formData()', has(w, 'formData')], ['.query()', has(w, 'query')]]);

  runScript(stage, async (wait) => {
    seen.show(null);
    showMethods(plain);
    stage.say('A plain client has no .formData() and no .query()', 'warn');
    await wait(1600);
    showMethods(api);
    stage.say('.addon([FormDataAddon, QueryStringAddon]) plugs both in', 'ok');
    await wait(1400);
    await api.formData({ name: 'Aino' }).query({ ref: 'newsletter' }).post().res().catch(() => {});
    if (stage.disposed) return;
    seen.show(server.requests.at(-1)!);
    stage.say('Both new methods worked: a form body and a query string went out', 'ok');
    await wait(2400);
  });
  return () => stage.dispose();
};

export default mount;
