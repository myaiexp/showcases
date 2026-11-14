// .content() labels what you send, and the label decides how it is read
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const BODY = '{"name":"Aino","city":"Jyväskylä"}';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Identical text, two labels.' });
  const server = createServer(stage, {
    'POST /notes': (req) => {
      const b = req.body;
      if (b.kind === 'json') return { json: { understood: `Data with ${Object.keys(b.value as object).length} fields: ${Object.entries(b.value as object).map(([k, v]) => `${k} = ${String(v)}`).join(', ')}` } };
      return { json: { understood: `Just words: ${b.kind === 'text' ? b.text : '?'}` } };
    },
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['content-type'] });
  const shown = screen(stage.root, 'How the server read it');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const send = async (type: string): Promise<void> => {
    stage.say(`.content("${type}").post(text)`);
    const reply = await api
      .content(type)
      .post(BODY, '/notes') // a string body is sent as it is
      .json<{ understood: string }>()
      .catch(() => null);
    if (stage.disposed || !reply) return;
    seen.show(server.requests.at(-1)!);
    shown.show(reply.understood, type === 'application/json' ? 'ok' : 'warn');
    stage.say(type === 'application/json' ? 'Labelled as JSON, so the server unpacked it' : 'Labelled as plain text, so the server left it alone', 'info');
  };

  runCases(stage, [
    { label: 'text/plain', run: () => send('text/plain') },
    { label: 'application/json', run: () => send('application/json') },
  ]);
  return () => stage.dispose();
};

export default mount;
