// A reusable client: the base address once, then .get(path).json() for each post
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { findPost, findUser, POSTS, type Post } from '../../shared/data.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { postCard } from './post-card.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a post. The server is simulated in the page.' });
  const server = createServer(stage, {
    'GET /posts/:id': (req) => {
      const post = findPost(req.params['id']!);
      return post ? { json: post } : { status: 404, json: { error: 'No such post' } };
    },
  });
  wire(stage, server, { rows: stage.preview ? 1 : 4 });
  const card = postCard(stage.root);

  // The client: the address once, reused by every request below.
  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const open = async (id: number): Promise<void> => {
    stage.say(`api.get("/posts/${id}").json()`);
    const post = await api.get(`/posts/${id}`).json<Post>();
    if (stage.disposed) return;
    card.show(post, findUser(post.userId)?.name ?? '');
    stage.say(`Post ${post.id} arrived as a ready-to-use object`, 'ok');
  };

  if (stage.bar) for (const p of POSTS) button(stage.bar, `Post ${p.id}`, () => void open(p.id).catch(() => {}));
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const p of POSTS) {
        await open(p.id);
        await wait(1600);
      }
    });
  } else void open(1).catch(() => {});
  return () => stage.dispose();
};

export default mount;
