// .url(address, true) replaces the old address instead of adding to it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { findPost } from '../../shared/data.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { hostBoxes } from './hosts.ts';
import './style.css';

const MIRROR = 'https://mirror.api.example';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same path asked of two different servers.' });
  // One route answers for every host and says which host it was asked at.
  const server = createServer(stage, {
    'GET /posts/:id': (req) => ({ json: { servedBy: new URL(req.url).host, post: findPost(req.params['id']!)?.title } }),
  });
  wire(stage, server, { rows: 0, server: 'servers' });
  const hosts = hostBoxes(stage, server, ['api.example', 'mirror.api.example']);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  // true = replace: the base address is no longer api.example, it is the mirror.
  const mirror = api.url(MIRROR, true);

  const ask = async (client: typeof api, say: string): Promise<void> => {
    stage.say(say);
    const answer = await client
      .get('/posts/1')
      .json<{ servedBy: string; post: string }>()
      .catch(() => null);
    if (stage.disposed || !answer) return;
    hosts.light(answer.servedBy);
    shown.show(`"${answer.post}"\nanswered by ${answer.servedBy}`, 'ok');
    stage.say(`${answer.servedBy} answered`, 'ok');
  };

  runCases(stage, [
    { label: 'Ask the usual address', run: () => ask(api, 'api.get("/posts/1")') },
    { label: 'Ask the mirror', run: () => ask(mirror, 'api.url("https://mirror.api.example", true).get("/posts/1")') },
  ]);
  return () => stage.dispose();
};

export default mount;
