// A missing post (404) goes to .notFound(), which shows a friendly message
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { findPost, POSTS, type Post } from '../../shared/data.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const IDS = [2, 999, 5, 404];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a post number, some of them do not exist.' });
  const server = createServer(stage, {
    'GET /posts/:id': (req) => {
      const post = findPost(req.params['id']!);
      return post ? { json: post } : { status: 404, json: { error: 'No such post' } };
    },
  });
  wire(stage, server, { rows: stage.preview ? 1 : 4 });
  const screen = pane(stage.root, 'What the app shows');
  screen.set('Nothing asked for yet', 'dim');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const open = async (id: number): Promise<void> => {
    stage.say(`api.get("/posts/${id}").notFound(…).json(…)`);
    await api
      .get(`/posts/${id}`)
      // A 404 lands here, and the .json() below is skipped.
      .notFound(() => {
        screen.set('Post not found!', 'warn');
        stage.say(`The server said 404, so .notFound() showed a friendly message`, 'warn');
      })
      .json((post: Post) => {
        screen.set(`${post.title}\n${post.body}`, 'ok');
        stage.say(`Post ${id} exists: .json() handed it to the app`, 'ok');
      });
  };
  const safe = (id: number): void => void open(id).catch(() => {}); // only a closed card ends up here

  if (stage.bar) {
    const options = [...POSTS.map((p) => p.id), 999].map((n) => [n, n === 999 ? '999 (does not exist)' : `Post ${n}`] as const);
    let id = 999;
    select(stage.bar, 'Post', options, (v) => (id = v), 999);
    button(stage.bar, 'Open it', () => safe(id));
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const id of IDS) {
        await open(id);
        await wait(1700);
      }
    });
  } else safe(999);
  return () => stage.dispose();
};

export default mount;
