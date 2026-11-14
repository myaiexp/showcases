// Catchers on the base client handle errors for every request made from it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { findPost } from '../../shared/data.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three requests, no error handling written for any of them.' });
  const server = createServer(stage, {
    'GET /posts/:id': (req) => {
      const post = findPost(req.params['id']!);
      return post ? { json: post } : { status: 404, json: { error: 'No such post' } };
    },
    'GET /report': () => ({ status: 500, text: 'The report machine caught fire' }),
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.catcher(404)', '.catcher(500)', '.json()']);
  const shown = screen(stage.root, 'What the app shows');

  // Set once on the base client: every request made from `api` is covered.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .catcher(404, () => {
      ran.fire('.catcher(404)', 'warn');
      shown.show('That page does not exist', 'warn');
    })
    .catcher(500, () => {
      ran.fire('.catcher(500)', 'bad');
      shown.show('Something broke on our side, try later', 'bad');
    });

  const load = async (path: string, say: string): Promise<void> => {
    stage.say(say);
    ran.reset();
    // No error handling here: the base client already has it.
    await api
      .get(path)
      .json((post: { title: string }) => {
        ran.fire('.json()', 'ok');
        shown.show(post.title, 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'A post that exists', run: () => load('/posts/1', 'api.get("/posts/1").json()') },
    { label: 'A post that does not', run: () => load('/posts/99', 'api.get("/posts/99").json(): 404, handled by the base client') },
    { label: 'A broken page', run: () => load('/report', 'api.get("/report").json(): 500, handled by the base client') },
  ]);
  return () => stage.dispose();
};

export default mount;
