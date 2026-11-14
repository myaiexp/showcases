// .headers({ 'content-type' }) plus .json(): two spellings of one header
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { contentTypeView, strictJsonRoute } from '../../shared/ctype.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server accepts the post only if Content-Type is exactly application/json.' });
  const server = createServer(stage, { 'POST /posts': strictJsonRoute });
  wire(stage, server, { rows: 0 });
  const sent = contentTypeView(stage, server);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const post = async (say: string, request: Promise<unknown>): Promise<void> => {
    sent.set([], 'Sending…');
    shown.clear('Saving…');
    stage.say(say);
    const result = await request.then(() => true).catch(() => false);
    if (stage.disposed) return;
    shown.show(result ? 'Saved' : 'The server refused the post', result ? 'ok' : 'bad');
    stage.say(
      result ? 'One Content-Type header was sent, and the server was happy' : 'Both spellings were sent and merged into "application/json, application/json"',
      result ? 'ok' : 'bad',
    );
  };

  runCases(stage, [
    {
      label: 'Two spellings',
      // .json() sets "Content-Type" itself. wretch holds headers in a plain object, so this one is a second key.
      run: () => post('.headers({ "content-type": … }).json(…)', api.headers({ 'content-type': 'application/json' }).json({ foo: 'bar' }).post(undefined, '/posts').res()),
    },
    {
      label: 'Let .json() do it',
      run: () => post('.json(…) alone', api.json({ foo: 'bar' }).post(undefined, '/posts').res()),
    },
    {
      label: 'Same spelling twice',
      // The same key is replaced, not added to.
      run: () => post('.headers({ "Content-Type": … }).json(…)', api.headers({ 'Content-Type': 'application/json' }).json({ foo: 'bar' }).post(undefined, '/posts').res()),
    },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
