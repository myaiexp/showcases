// .formUrl() turns an object into an encoded string and sets the content type
import wretch from 'wretch';
import FormUrlAddon from 'wretch/addons/formUrl';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { pane } from '../../shared/pane.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const FORMS: { say: string; form: object }[] = [
  { say: 'A nested object is written as JSON text', form: { a: 1, b: { c: 2 } } },
  { say: 'A list repeats the key; & and spaces are escaped', form: { tags: ['red', 'blue'], q: 'duck & goose' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same kind of body an old-fashioned HTML form sends.' });
  const server = createServer(stage, { 'POST /search': () => ({ json: { ok: true } }) });
  if (!stage.preview) wire(stage, server, { rows: 2 });
  const mine = pane(stage.root, 'Your object');
  const wireView = kv(stage.root, 'What went over the wire');

  const api = wretch(`${BASE}/search`).fetchPolyfill(server.fetch).addon(FormUrlAddon);

  runCases(
    stage,
    FORMS.map(({ say, form }, i) => ({
      label: `Form ${i + 1}`,
      run: async () => {
        stage.say(say);
        mine.set(JSON.stringify(form));
        await api.formUrl(form).post().res().catch(() => {});
        if (stage.disposed) return;
        const { body, headers } = server.requests.at(-1)!;
        if (body.kind !== 'urlencoded') return;
        wireView.set([
          ['content-type', headers.get('content-type') ?? ''],
          ['body', body.text],
          ['server reads', body.entries.map(([k, v]) => `${k}=${v}`).join('  ')],
        ]);
        stage.say(`${say}; the content type was set for you`, 'ok');
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
