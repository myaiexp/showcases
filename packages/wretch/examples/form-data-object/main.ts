// .formData() turns a plain object into the multipart form fields a server reads
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { formPair } from '../../shared/formpair.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const FORMS: { say: string; form: object }[] = [
  { say: 'Two text fields', form: { hello: 'world', duck: 'Muscovy' } },
  { say: 'Numbers and true/false become text too', form: { name: 'Aino', age: 34, newsletter: true } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each object is sent as a form, the way an HTML form would.' });
  const server = createServer(stage, { 'POST /ducks': () => ({ status: 201, json: { ok: true } }) });
  if (!stage.preview) wire(stage, server, { rows: 2 });
  const pair = formPair(stage);
  const seen = envelope(stage, { headers: ['content-type'], noBody: true });

  const api = wretch(`${BASE}/ducks`).fetchPolyfill(server.fetch).addon(FormDataAddon);

  runCases(
    stage,
    FORMS.map(({ say, form }, i) => ({
      label: `Form ${i + 1}`,
      run: async () => {
        stage.say(say);
        pair.show(form, null);
        await api.formData(form).post().res().catch(() => {});
        if (stage.disposed) return;
        const req = server.requests.at(-1)!;
        pair.show(form, req);
        seen.show(req);
        stage.say(`${say}: every key became one form field`, 'ok');
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
