// A catcher can return a stand-in value that becomes the request result
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findPost, type Post } from '../../shared/data.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const PLACEHOLDER: Post = { id: 0, userId: 0, title: 'This post is not available', body: 'It may have been removed.' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The page always has a post to show, even when the server has none.' });
  const server = createServer(stage, {
    'GET /posts/:id': (req) => {
      const post = findPost(req.params['id']!);
      return post ? { json: post } : { status: 404, json: { error: 'No such post' } };
    },
  });
  wire(stage, server, { rows: 0 });
  const page = screen(stage.root, 'What the page shows');

  const open = async (id: number): Promise<void> => {
    page.clear('Loading…');
    stage.say(`api.get("/posts/${id}").notFound(() => placeholder).json()`);
    const post = (await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/posts/${id}`)
      // Returning a value (instead of throwing) makes it the answer.
      .notFound(() => PLACEHOLDER)
      .json()
      .catch(() => PLACEHOLDER)) as Post;
    if (stage.disposed) return;
    const fake = post === PLACEHOLDER;
    page.show(`${post.title}\n${post.body}`, fake ? 'warn' : 'ok');
    stage.say(fake ? 'The server had no such post: the catcher\'s stand-in came out of the same await' : 'The real post came from the server', fake ? 'warn' : 'ok');
  };

  runCases(stage, [
    { label: 'A post that exists', run: () => open(2) },
    { label: 'A post that does not', run: () => open(99) },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
