// .json(object, type) sends JSON under a content type you choose
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const TYPE = 'application/vnd.api+json';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: `This server only accepts ${TYPE}.` });
  const server = createServer(stage, {
    'POST /articles': (req) =>
      req.headers.get('content-type') === TYPE
        ? { status: 201, json: { created: true } }
        : { status: 415, json: { error: `Send ${TYPE}` } },
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['content-type'] });
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const article = { data: { type: 'articles', attributes: { title: 'Hello' } } };

  const send = async (say: string, request: ReturnType<typeof api.json>): Promise<void> => {
    stage.say(say);
    shown.clear();
    await request
      .url('/articles')
      .post()
      .error(415, () => {
        shown.show('The server refused: wrong kind of JSON label', 'warn');
        stage.say('415: the plain "application/json" label was not what it wanted', 'warn');
      })
      .res(() => {
        shown.show('Article created', 'ok');
        stage.say('Accepted: the custom label travelled with the JSON', 'ok');
      })
      .catch(() => {});
    if (!stage.disposed) seen.show(server.requests.at(-1)!);
  };

  runCases(stage, [
    { label: 'Custom type', run: () => send(`.json(article, "${TYPE}")`, api.json(article, TYPE)) },
    { label: 'Default type', run: () => send('.json(article)', api.json(article)) },
  ]);
  return () => stage.dispose();
};

export default mount;
