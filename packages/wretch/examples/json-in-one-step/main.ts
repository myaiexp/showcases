// Plain fetch needs a second step to read JSON; wretch's .json() does both in one
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { compare } from '../../shared/compare.ts';
import { button } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

interface Post {
  id: number;
  title: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both columns ask the same simulated server for the same post.' });
  const server = createServer(stage, { 'GET /posts/1': () => ({ json: { id: 1, userId: 1, title: 'Morning light over the lake' } }) });
  wire(stage, server, { rows: 0 });
  const [plain, nice] = compare(stage.root);

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const shown = (post: Post): string => `{ id: ${post.id}, title: "${post.title}" }`;

  const plainFetch = async (): Promise<void> => {
    // `server.fetch` stands in for the browser's own fetch: same call, answered inside the page.
    const response = await server.fetch(`${BASE}/posts/1`);
    if (stage.disposed) return;
    plain.step(stage.preview ? 'fetch() → Response' : 'fetch(url) gives a Response, no data yet');
    const post = (await response.json()) as Post;
    if (stage.disposed) return;
    plain.step(stage.preview ? 'r.json() → data' : '.then(r => r.json()) gives the data');
    plain.done(shown(post), 'ok');
  };

  const withWretch = async (): Promise<void> => {
    await api.get('/posts/1').json((post: Post) => {
      if (stage.disposed) return;
      nice.step(stage.preview ? '.json() → data' : '.get().json(post => …) gives the data');
      nice.done(shown(post), 'ok');
    });
  };

  const run = async (): Promise<void> => {
    plain.reset();
    nice.reset();
    stage.say('Both ask for post 1. Watch how many steps each needs to reach the data');
    await Promise.all([plainFetch(), withWretch()]);
    if (!stage.disposed) stage.say('Same data either way. wretch just skipped the extra step', 'ok');
  };
  const safe = (): void => void run().catch(() => {});

  if (stage.bar) button(stage.bar, 'Fetch again', safe);
  if (stage.preview) {
    stage.play(async (wait) => {
      await run();
      await wait(2200);
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
