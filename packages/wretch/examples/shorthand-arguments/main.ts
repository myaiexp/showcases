// .get(url) and .post(body, url) are shorthand for the longer chain
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { twin } from '../../shared/twin.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each pair says the same thing in a short and a long way.' });
  const server = createServer(stage, {
    'GET /posts': () => ({ json: [] }),
    'POST /posts': () => ({ status: 201, json: { saved: true } }),
  });
  wire(stage, server, { rows: 0 });
  const both = twin(stage, 'Shorthand', 'Spelled out', ['content-type']);

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  const post = { title: 'Hello', draft: true };

  const compare = async (say: string, short: () => Promise<unknown>, long: () => Promise<unknown>): Promise<void> => {
    both.show(null, null);
    stage.say(say);
    await short().catch(() => {});
    if (stage.disposed) return;
    const first = server.requests.at(-1)!;
    await long().catch(() => {});
    if (stage.disposed) return;
    both.show(first, server.requests.at(-1)!);
  };

  runCases(stage, [
    {
      label: 'get',
      run: () => compare('api.get("/posts")  vs  api.url("/posts").get()', () => api.get('/posts').res(), () => api.url('/posts').get().res()),
    },
    {
      label: 'post',
      run: () =>
        compare('api.post({…}, "/posts")  vs  api.json({…}).url("/posts").post()', () => api.post(post, '/posts').res(), () => api.json(post).url('/posts').post().res()),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
